use sqlx::Acquire;

use crate::shared::connect_prod;

/// Gets all available previous items
pub async fn get_prev_items() -> Vec<String> {
    let mut pool = connect_prod().await;
    let conn = pool.acquire().await.unwrap();

    sqlx::query!("SELECT name FROM item").fetch_all(conn).await.unwrap()
      .iter()
      .map(|r| r.name.clone())
      .collect()
}
