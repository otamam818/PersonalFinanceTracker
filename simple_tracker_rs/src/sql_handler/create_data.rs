use sqlx::Acquire;

use crate::shared::connect_prod;

pub async fn insert_item(name: &str, category: Option<u32>, price: f32) {
    let mut pool = connect_prod().await;
    let conn = pool.acquire().await.unwrap();
    sqlx::query!("
        INSERT INTO item (name, category_id, current_price)
        VALUES (?, ?, ?)
    ", name, category, price).execute(conn).await.unwrap();
}
