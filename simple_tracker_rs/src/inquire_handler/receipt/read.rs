use std::collections::HashMap;

use crate::{
    shared::{connect_prod, DbIdNumber},
    sql_handler::{models::receipt::ReceiptInserter, read_data::get_name_list},
};
use inquire::*;
use sqlx::Acquire;

type ItemQuantity = (String, DbIdNumber, f64);

pub async fn view_receipt() {
    let receipt_list = get_name_list(crate::shared::TransactionEntity::Receipt).await;
    // TODO: In the future, allow the user to select from a date based on the months available
    let choice = Select::new("Select a date to view from", receipt_list).prompt();

    if let Ok(value) = choice {
        choose_store_from_date(value).await;
    }
}

async fn choose_store_from_date(value: String) {
    // Print the receipt's inner contents (including items and their prices)
    let mut pool = connect_prod().await;
    let conn = pool.acquire().await.unwrap();
    let receipt_list: Vec<ReceiptInserter> =
        sqlx::query_as(&format!("SELECT * FROM receipt WHERE date = '{value}'"))
            .fetch_all(conn)
            .await
            .unwrap();

    // Records the ids associated with the store_names
    let (receipt_view_binding, venue_id_map) = get_receipt_view(receipt_list, &mut pool).await;
    let receipt_view: Vec<&str> = receipt_view_binding.iter().map(|s| s.as_str()).collect();

    let choice = Select::new("Select a date to view from", receipt_view).prompt();
    if let Ok(value) = choice {
        // Get the venue id from the map and the receipt_id from the date and venue_id
        let (date, venue_id) = {
            let mut iter = value.split(" | ");
            let date = iter.next().unwrap();
            let key = iter
                .next()
                .expect("It to exist as it was just called within this function")
                .to_string();
            let venue_id = venue_id_map
                .get(&key)
                .expect("The key to have been stored beforehand")
                .to_owned();
            (date, venue_id)
        };

        let receipt_id = get_receipt_id(date, venue_id, &mut pool).await;

        // Tuple of (name, quantity, price)
        let item_list: Vec<ItemQuantity> = get_item_quantities(pool, receipt_id).await;

        let mut total_price = 0f64;
        println!("You bought:");
        for item in item_list {
            let (name, quantity, price) = (item.0, item.1, item.2);
            let compound_price = quantity as f64 * price;
            // TODO: Change it from AUD to a more universal price system
            println!("Item: {name}\nQuantity: {quantity}\nPrice(each): {price} AUD");
            println!("Total for item: {compound_price} AUD\n");
            total_price += compound_price;
        }
        println!("Total for receipt: {total_price}");
    }
}

async fn get_receipt_id(date: &str, venue_id: i64, pool: &mut sqlx::SqliteConnection) -> i64 {
    let conn = pool.acquire().await.unwrap();
    let receipt_id: DbIdNumber = sqlx::query!(
        "SELECT id FROM receipt WHERE date = ? AND venue_id = ?",
        date,
        venue_id
    )
    .fetch_one(conn)
    .await
    .unwrap()
    .id;
    receipt_id
}

/// Returns a list of strings in the format `{receipt_date} | {store_name}`
/// and a HashMap of {name: venue_id} values
async fn get_receipt_view(
    receipt_list: Vec<ReceiptInserter>,
    pool: &mut sqlx::SqliteConnection,
) -> (Vec<String>, HashMap<String, i64>) {
    let mut venue_id_map = HashMap::new();
    let mut fin_vec = Vec::new();
    for receipt_item in receipt_list {
        let conn = pool.acquire().await.unwrap();
        let venue_name: String =
            sqlx::query!("SELECT name FROM venue WHERE id = ?", receipt_item.venue_id)
                .fetch_one(conn)
                .await
                .unwrap()
                .name
                .unwrap();
        venue_id_map.insert(venue_name.clone(), receipt_item.venue_id);
        fin_vec.push(format!("{} | {}", receipt_item.date, venue_name));
    }
    (fin_vec, venue_id_map)
}

// Use the receipt_id to get the items and quantities. Provide a total price too
async fn get_item_quantities(
    mut pool: sqlx::SqliteConnection,
    receipt_id: i64,
) -> Vec<ItemQuantity> {
    let conn = pool.acquire().await.unwrap();
    let record_list = sqlx::query!(
        "SELECT item_id, quantity
         FROM receipt_items
         WHERE receipt_id = ?",
        receipt_id
    )
    .fetch_all(conn)
    .await
    .unwrap();

    let mut finlist = Vec::new();
    for row in record_list {
        let conn = pool.acquire().await.unwrap();
        let query = sqlx::query!(
            "
                    SELECT name, current_price
                    FROM item
                    WHERE id = ?
                ",
            row.item_id
        )
        .fetch_one(conn)
        .await
        .unwrap();
        let item_quantity: ItemQuantity = (query.name, row.quantity, query.current_price);
        finlist.push(item_quantity);
    }

    finlist
}
