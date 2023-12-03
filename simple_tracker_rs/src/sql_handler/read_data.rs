use sqlx::Acquire;

use crate::shared::{connect_prod, DbIdNumber, TransactionEntity};

/// Gets all available previous items
pub async fn get_name_list(origin: TransactionEntity) -> Vec<String> {
    let mut pool = connect_prod().await;
    let conn = pool.acquire().await.unwrap();
    use TransactionEntity as TE;
    match origin {
        TE::Item => query_name(conn, "item").await,
        TE::Venue => query_name(conn, "venue").await,
        TE::Category => query_name(conn, "category").await,
        /* TODO
        TE::Receipt => todo!(),
        TE::Unit => todo!(),
         */
    }
}

/// Queries the name column from a given table
async fn query_name(conn: &mut sqlx::SqliteConnection, table: &str) -> Vec<String> {
    let query = format!("SELECT name FROM {}", table);
    sqlx::query_as::<_, (String,)>(&query)
        .fetch_all(conn)
        .await
        .unwrap()
        .iter()
        .map(|r| r.0.clone())
        .collect()
}

pub async fn check_if_location_exists(candidate_location: &str) -> bool {
    let mut pool = connect_prod().await;
    let conn = pool.acquire().await.unwrap();

    sqlx::query!("SELECT * FROM venue WHERE name == ?", candidate_location)
        .fetch_all(conn)
        .await
        .unwrap()
        .len()
        != 0
}

/// Gets the category_id from the category table if it exists, otherwise
/// creates a new category and returns that id
pub async fn get_venue_id_from_name(name: &str) -> DbIdNumber {
    let mut pool = connect_prod().await;
    let mut conn = pool.begin().await.unwrap();
    let mut transaction = &mut conn;
    let available_ids = sqlx::query!("SELECT id FROM venue WHERE name == ?", name)
        .fetch_all(&mut **transaction)
        .await
        .unwrap();
    let found_id: DbIdNumber = match available_ids.len() {
        0 => {
            sqlx::query!("INSERT INTO venue (name, location) VALUES (?, NULL)", name)
                .execute(&mut **transaction)
                .await
                .unwrap();

            conn.commit().await.unwrap();

            conn = pool.begin().await.unwrap();
            transaction = &mut conn;

            let created_id = sqlx::query!("SELECT id FROM venue WHERE name == ?", name)
                .fetch_one(&mut **transaction)
                .await
                .unwrap();

            created_id.id
        }
        1 => available_ids[0].id,
        _ => panic!("Duplicate category_id found"),
    };

    found_id
}
