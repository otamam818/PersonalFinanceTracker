use crate::date::Date;
use crate::time::Time;
use serde_derive::Serialize;

// TODO: Modularize the time implementation
// TODO: Make a DataFile struct

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
    pub store_id: u8,
    pub category_ids: Vec<u16>
}

#[derive(Debug, Serialize, Clone)]
pub struct Receipt {
    pub date: Date,
    pub time: Time,
    pub location_id: u16,
}

#[derive(Debug, Serialize, Clone)]
pub struct AllReceipts {
    pub data: Vec<Receipt>
}

