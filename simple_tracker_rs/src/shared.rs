use sqlx::{sqlite::SqliteConnectOptions, ConnectOptions, SqliteConnection};
use std::{str::FromStr, collections::HashMap};

pub const DATABASE_NAME: &str = "data.db";
pub type DynamicError = Box<dyn std::error::Error>;
pub type ItemMap = HashMap<String, usize>;
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
