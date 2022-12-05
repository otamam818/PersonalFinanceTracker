use crate::date::Date;
use crate::time::Time;
use serde_derive::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Category {
    pub id: u16,
    pub name: String,
    pub description: String,

    // the u16 would be the corresponding sub-category id
    pub sub_category: Vec<u16>
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Item {
    pub id: u16,
    pub name: String,

    /// prices.last() would be the latest price, whereas prices.first
    /// would be the first-noted price
    pub prices: Vec<u16>,
    pub currency_id: u8,
    pub category_ids: Vec<u16>
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Receipt {
    pub date: Date,
    pub time: Time,
    pub store_id: u16,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Store {
    pub id: u8,
    pub location: String,
    pub name: String
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct BoughtItems {
    pub item_id: u16,
    pub quantity: u16,
    pub store_id: u8,
    pub receipt_id: String
}

// Key Implementations
pub trait Key<T> {
    fn get_key(&self) -> T;
}

impl Key<u16> for Category {
    fn get_key(&self) -> u16 {
        self.id
    }
}

impl Key<u16> for Item {
    fn get_key(&self) -> u16 {
        self.id
    }
}

impl Key<String> for Receipt {
    fn get_key(&self) -> String {
        format!("{}|{}|{}", self.date, self.time, self.store_id)
    }
}

impl Key<u8> for Store {
    fn get_key(&self) -> u8 {
        self.id
    }
}

impl Key<String> for BoughtItems {
    fn get_key(&self) -> String {
        format!(
            "{}|{}|{}",
            self.item_id,
            self.store_id,
            self.receipt_id
        )
    }
}

