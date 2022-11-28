use crate::date::Date;
use serde_derive::Serialize;

#[derive(Debug, PartialEq, Serialize, Clone)]
pub struct Time (u8, u8);

impl Time {
    #[allow(dead_code)]
    pub fn new(hours: u8, minutes: u8) -> Result<Time, &'static str> {
        if hours > 23 {
            return Err("Hours exceeded");
        }

        if minutes > 59 {
            return Err("Minutes exceeded");
        }

        Ok(Time(hours, minutes))
    }

    pub fn hours(&self) -> u8 {
        self.0
    }

    pub fn minutes(&self) -> u8 {
        self.1
    }
}

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

