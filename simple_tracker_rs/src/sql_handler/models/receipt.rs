use sqlx::Acquire;

use crate::shared::{connect_prod, DbIdNumber, ItemList};

use super::ErrorMessage;

#[derive(sqlx::FromRow)]
pub struct ReceiptInserter {
    pub id: Option<DbIdNumber>,
    pub venue_id: DbIdNumber,
    pub date: String,
}

impl ReceiptInserter {
    pub async fn exists_in_database(&mut self) -> bool {
        let mut pool = connect_prod().await;
        let mut conn = pool.begin().await.unwrap();
        let transaction = &mut conn;
        let num_items = sqlx::query!(
            "SELECT * FROM receipt WHERE date == ? AND venue_id == ?",
            self.date,
            self.venue_id
        )
        .fetch_all(&mut **transaction)
        .await
        .unwrap()
        .len();

        num_items > 0
    }

    pub async fn insert_to_database(&mut self) -> Result<(), ErrorMessage> {
        let mut pool = connect_prod().await;
        let mut conn = pool.begin().await.unwrap();
        let transaction = &mut conn;
        let _ = sqlx::query!(
            "INSERT INTO receipt (venue_id, date) VALUES (?, ?)",
            self.venue_id,
            self.date
        )
        .execute(&mut **transaction)
        .await
        .unwrap();

        let receipt_id: DbIdNumber = sqlx::query!(
            "SELECT id FROM receipt WHERE venue_id == ? AND date == ?",
            self.venue_id,
            self.date
        )
        .fetch_one(&mut **transaction)
        .await
        .unwrap()
        .id;

        self.id = Some(receipt_id);
        conn.commit().await.unwrap();
        Ok(())
    }
}

pub struct ReceiptBuilder {
    #[allow(unused)]
    id: Option<DbIdNumber>,
    venue_id: Option<DbIdNumber>,
    date: Option<String>,
    // The item itself and the quantity of it bought at a given time
    items: ItemList,
}

impl ReceiptBuilder {
    pub fn new() -> Self {
        Self {
            id: None,
            venue_id: None,
            date: None,
            items: vec![],
        }
    }

    pub fn with_venue_id(mut self, id: DbIdNumber) -> Self {
        self.venue_id = Some(id);
        self
    }

    pub fn with_item_list(mut self, item_list: ItemList) -> Self {
        self.items = item_list;
        self
    }

    pub fn with_date(mut self, date: Option<String>) -> Self {
        self.date = date;
        self
    }

    pub async fn insert_to_database(self) -> Result<(), ErrorMessage> {
        let (Some(date), Some(venue_id), items) = (self.date, self.venue_id, self.items) else {
            return Err(ErrorMessage::NonExhaustiveFields);
        };

        let mut receipt_inserter = ReceiptInserter {
            id: self.id,
            date,
            venue_id,
        };

        // Early return if this exact record already exists in database
        if receipt_inserter.exists_in_database().await {
            return Ok(());
        }

        receipt_inserter.insert_to_database().await.unwrap();

        let mut pool = connect_prod().await;
        let mut conn = pool.begin().await.unwrap();
        let transaction = &mut conn;
        for (item_builder, quantity) in items {
            use ErrorMessage as EM;
            let item_inserter = match item_builder.insert_to_database().await {
                Ok(inserter) => inserter,
                Err(EM::NonExhaustiveFields) => panic!("NonExhaustiveFields"),
            };
            let receipt_id = receipt_inserter.id.unwrap();
            let item_id = item_inserter.id.unwrap();
            sqlx::query!(
                "INSERT INTO receipt_items (receipt_id, item_id, quantity)
                 VALUES (?, ?, ?)",
                 receipt_id,
                 item_id,
                 quantity
            ).execute(&mut **transaction).await.unwrap();
        }

        // Everything has finally been wrapped up
        conn.commit().await.unwrap();

        println!("Done!");
        Ok(())
    }
}
