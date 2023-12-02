use sqlx::{Acquire, Row};

use crate::shared::{connect_prod, TransactionEntity, DbIdNumber};

/// Gets all available previous items
pub async fn get_name_list(origin: TransactionEntity) -> Vec<String> {
    let mut pool = connect_prod().await;
    let conn = pool.acquire().await.unwrap();
    use TransactionEntity as TE;
    match origin {
        TE::Item => query_name(conn, "item").await,
        TE::Venue => query_name(conn, "venue").await,
        /* TODO
        TE::Category => todo!(),
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
pub async fn get_category_id_from_name(
    name: &str,
    transaction: &mut sqlx::Transaction<'_, sqlx::Sqlite>,
) -> DbIdNumber {
    let available_ids = sqlx::query(&format!(
        "SELECT category_id FROM category WHERE name == {}",
        name
    ))
    .fetch_all(&mut **transaction)
    .await
    .unwrap();
    let found_id: DbIdNumber = match available_ids.len() {
        0 => {
            sqlx::query!("INSERT INTO category (name) VALUES (?)", name)
                .execute(&mut **transaction)
                .await
                .unwrap();
            let created_id = sqlx::query(&format!(
                "SELECT category_id FROM category WHERE name == {}",
                name
            ))
            .fetch_one(&mut **transaction)
            .await
            .unwrap();

            created_id.try_get::<DbIdNumber, _>(0).unwrap()
        }
        1 => available_ids[0].try_get::<DbIdNumber, _>(0).unwrap(),
        _ => panic!("Duplicate category_id found"),
    };

    found_id
}

/// Gets the item from the item table if it exists, otherwise
/// creates a new item and returns that id
pub async fn get_item_id_from_name(
    name: &str,
    transaction: &mut sqlx::Transaction<'_, sqlx::Sqlite>,
    category: Option<u32>,
) -> DbIdNumber {
    let available_ids = sqlx::query!(
        "SELECT id FROM item WHERE name == ? AND category_id == ?",
        name,
        category
    )
    .fetch_all(&mut **transaction)
    .await
    .unwrap();
    let found_id: DbIdNumber = match available_ids.len() {
        0 => {
            sqlx::query!(
                "INSERT INTO item (name, category_id) VALUES (?, ?)",
                name,
                category
            )
            .execute(&mut **transaction)
            .await
            .unwrap();
            let created_id = sqlx::query!("SELECT id FROM item WHERE name == ?", name)
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

pub async fn get_venue_id_from_name(
    name: &str,
) -> DbIdNumber {
    let mut pool = connect_prod().await;
    let mut conn = pool.begin().await.unwrap();
    let transaction = &mut conn;
    let available_ids = sqlx::query!("SELECT id FROM venue WHERE name == ?", name)
        .fetch_all(&mut **transaction)
        .await
        .unwrap();
    let found_id: DbIdNumber = match available_ids.len() {
        0 => {
            sqlx::query!(
                "INSERT INTO venue (name, location) VALUES (?, NULL)",
                name
            )
            .execute(&mut **transaction)
            .await
            .unwrap();

            let created_id = sqlx::query(&format!(
                "SELECT id FROM venue WHERE name == {}",
                name,
            ))
            .fetch_one(&mut **transaction)
            .await
            .unwrap();

            created_id.try_get::<DbIdNumber, _>(0).unwrap()
        }
        1 => available_ids[0].id,
        _ => panic!("Duplicate category_id found"),
    };

    conn.commit().await.unwrap();
    found_id
}
