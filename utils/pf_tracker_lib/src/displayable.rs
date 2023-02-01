//! Shows displayable content for the front-end

//! Normally everything is stored to minimize the data used for storing, but
//! that does not mean it is always in a format that is nice to look at, so
//! this file would be for structs that make things displayable

use crate::DataMap;
use serde_derive::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ReceiptHistory {
    pub date: String,
    pub time: String,
    pub store: String,
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
        let date = receipt.date.in_minimonth_format();
        let time = format!("{}", receipt.time);
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
                format!("{} | {} | {}",
                    item.name,
                    item.prices.last().unwrap(),
                    quantity
                )
            })
            .collect::<Vec<String>>();

        ReceiptHistory {
            date,
            time,
            store: receipt.store_id.clone(),
            items
        }
    }
}

