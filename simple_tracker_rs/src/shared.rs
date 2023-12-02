use sqlx::{sqlite::SqliteConnectOptions, ConnectOptions, SqliteConnection};
use std::str::FromStr;

use crate::sql_handler::models::item::ItemBuilder;

pub const DATABASE_NAME: &str = "data.db";
pub type DynamicError = Box<dyn std::error::Error>;

// Denoting the item details and how many were bought
pub type ItemList = Vec<(ItemBuilder, i64)>;
#[allow(unused)]
pub type DbIdNumber = i64;

pub enum TransactionEntity {
    Item,
    Venue,
    /* TODO
    Unit,
    Receipt
     */
}

pub async fn connect_prod() -> SqliteConnection {
    connect(DATABASE_NAME).await
}

pub async fn connect(location: &str) -> SqliteConnection {
    SqliteConnectOptions::from_str(&format!("sqlite://{location}"))
        .unwrap()
        .create_if_missing(true)
        .connect()
        .await
        .unwrap()
}
