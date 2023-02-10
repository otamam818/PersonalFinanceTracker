//! Shows displayable content for the front-end

//! Normally everything is stored to minimize the data used for storing, but
//! that does not mean it is always in a format that is nice to look at, so
//! this file would be for structs that make things displayable

use crate::DataMap;
use serde_derive::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ReceiptHistory {
    // The key that it was referenced from
    // Used for editing the given receipt
    pub receipt_key: String,
    pub date: String,
    pub time: String,
    pub store: String,
    pub currency: String,
    pub items: Vec<String>,
}

impl ReceiptHistory {
    #[allow(non_snake_case)]
    pub fn from_DataMap(receipt_key: &str, map: DataMap) -> Self {
        let binding = map
            .receipts
            .expect("It would not be possible to call this function with an empty dataset");
        let receipt = binding
            .get(receipt_key)
            .expect("It would not be possible to call this function with an empty dataset");
        let receipt_key = receipt_key.to_string();
        let date = receipt.date.in_minimonth_format();
        let time = format!("{}", receipt.time);
        let store = receipt.store_id.clone();

        let mut currency = None;
        let items = receipt.items
            .iter()
            .map(|(key, quantity)| {
                let item = map
                .items
                .as_ref()
                .unwrap()
                .get(&key
                    .parse::<u16>()
                    .expect("It is always stored as an unsigned integer")
                )
                .unwrap();

                if currency.is_none() {
                    currency = Some(item.currency.clone());
                }

                format!("{} | {} | {}",
                    item.name,
                    item.prices.last().unwrap(),
                    quantity
                )
            })
            .collect::<Vec<String>>();

        let currency = currency
            .expect("If there is one item, a currency is guaranteed");

        ReceiptHistory { receipt_key, date, time, store, items, currency}
    }
}

