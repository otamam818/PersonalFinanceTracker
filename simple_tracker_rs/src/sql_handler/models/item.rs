use sqlx::{Transaction, Sqlite, Acquire};

use crate::shared::{connect_prod, DbIdNumber};

use super::ErrorMessage;

pub struct ItemInserter {
    pub id: Option<DbIdNumber>,
    pub name: String,
    pub category_id: Option<DbIdNumber>,
    pub current_price: f64,
}

impl ItemInserter {
    pub async fn is_unique(&mut self, transaction: &mut Transaction<'_, Sqlite>) -> bool {
        let num_items = sqlx::query!(
            "SELECT * FROM item WHERE name == ? AND category_id == ? AND current_price == ?",
            self.name,
            self.category_id,
            self.current_price
        ).fetch_all(&mut **transaction).await.unwrap().len();

        if num_items == 0 {
            // get the unique id and assign it to self
            return true;
        }

        false
    }

    pub async fn insert_to_database(&self, transaction: &mut Transaction<'_, Sqlite>) {
        let _ = sqlx::query!(
            "INSERT INTO item (name, category_id, current_price)
             VALUES (?, ?, ?)",
             self.name, self.category_id, self.current_price
        ).execute(&mut **transaction).await.unwrap();
    }
}

pub struct ItemBuilder {
    #[allow(unused)]
    id: Option<DbIdNumber>,
    name: Option<String>,
    category_id: Option<DbIdNumber>,
    current_price: Option<f64>,
}

impl ItemBuilder {
    pub fn new() -> Self {
        Self {
            id: None,
            name: None,
            category_id: None,
            current_price: None,
        }
    }

    pub fn with_name(mut self, name: String) -> Self {
        self.name = Some(name);
        self
    }

    pub fn with_category_id(mut self, category_id: Option<DbIdNumber>) -> Self {
        self.category_id = category_id;
        self
    }

    pub fn with_current_price(mut self, current_price: f64) -> Self {
        self.current_price = Some(current_price);
        self
    }

    pub async fn insert_to_database(&self) -> Result<ItemInserter, ErrorMessage> {
        let (id, Some(current_price), category_id, Some(name)) =
            (self.id, self.current_price, self.category_id, &self.name)
        else {
            return Err(ErrorMessage::NonExhaustiveFields);
        };

        let mut inserter = ItemInserter {
            id,
            current_price,
            category_id,
            name: name.to_owned(),
        };

        let mut pool = connect_prod().await;
        let mut conn = pool.begin().await.unwrap();
        let transaction = &mut conn;

        // We don't want to add duplicate items to the database
        if inserter.is_unique(transaction).await {
            inserter.insert_to_database(transaction).await;
        }

        conn.commit().await.unwrap();
        let mut conn = pool.begin().await.unwrap();
        let transaction = &mut conn;

        // Now we're sure that it exists, thus has an id
        let item_id: DbIdNumber = sqlx::query!("SELECT id FROM item WHERE name == ? AND category_id == ? AND current_price == ?",
            inserter.name,
            inserter.category_id,
            inserter.current_price
        ).fetch_one(&mut **transaction).await.unwrap().id;

        inserter.id = Some(item_id);
        Ok(inserter)
    }
}
