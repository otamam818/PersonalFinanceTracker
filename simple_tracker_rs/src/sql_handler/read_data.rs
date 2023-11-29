use std::slice::Iter;

use sqlx::Acquire;

use crate::shared::{connect_prod, TransactionEntity};

struct NameMap<'a> {
  name: &'a str
}

/// Gets all available previous items
pub async fn get_name_list(origin: TransactionEntity) -> Vec<String> {
    let mut pool = connect_prod().await;
    let conn = pool.acquire().await.unwrap();
    use TransactionEntity as TE;
    match origin {
        TE::Category => todo!(),
        TE::Item => sqlx::query!("SELECT name FROM item")
            .fetch_all(conn)
            .await
            .unwrap()
            .iter()
            .map(|r| r.name.clone())
            .collect(),
        TE::Receipt => todo!(),
        TE::Unit => todo!(),
        TE::Venue => sqlx::query!("SELECT name from venue")
            .fetch_all(conn)
            .await
            .unwrap()
            .iter()
            .filter(|r| r.name.is_some())
            .map(|r| r.name.clone().unwrap().clone())
            .collect(),
        _ => todo!(),
    }
}
