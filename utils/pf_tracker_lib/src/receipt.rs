use std::collections::HashMap;

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

type ItemKey = u16;
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Item {
    pub id: ItemKey,
    pub name: String,

    /// prices.last() would be the latest price, whereas prices.first()
    /// would be the first-noted price
    pub prices: Vec<String>,
    pub currency: String,
    pub category_ids: Vec<u16>
}

type Quantity = u16;
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Receipt {
    pub date: Date,
    pub time: Time,
    pub store_id: String,
    pub items: HashMap<ItemKey, Quantity>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Store {
    pub location: Option<String>,
    pub name: String
}

