use crate::date::Date;
use crate::time::Time;
use serde_derive::Serialize;

#[derive(Debug, Serialize, Clone)]
pub struct Category {
    id: u16,
    name: String,

    // the u16 would be the corresponding sub-category id
    sub_category: Vec<u16>
}

#[derive(Debug, Serialize, Clone)]
pub struct Item {
    pub id: u16,
    pub name: String,

    /// price_ids.last() would be the latest price, whereas price_ids.first
    /// would be the first-noted price
    pub price_ids: Vec<u16>,
    pub currency_id: u8,
    pub category_ids: Vec<u16>
}

#[derive(Debug, Serialize, Clone)]
pub struct Receipt {
    pub date: Date,
    pub time: Time,
    pub store_id: u16,
}

#[derive(Debug, Serialize, Clone)]
pub struct Store {
    pub id: u8,
    pub location: String,
    pub name: String
}

#[derive(Debug, Serialize, Clone)]
pub struct BoughtItems {
    pub item_id: u16,
    pub quantity: u16,
    pub store_id: u8,
    pub receipt_id: String
}

#[derive(Debug, Serialize, Clone)]
pub struct DataFile {
    pub receipts: Vec<Receipt>,
    pub items: Vec<Item>,
    pub stores: Vec<Store>,
    pub category: Vec<Category>,
    pub bought_items: Vec<BoughtItems>
}

