//! Implements a unified `Key` trait which can be used to store generic keys
//! through hashmaps
use crate::receipt::{BoughtItems, Category, Item, Store, Receipt};

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

impl Key<String> for Store {
    fn get_key(&self) -> String {
        match &self.location {
            Some(place) => format!("{} | {}", self.name, place),
            None => format!("{} | {}", self.name, "$Unknown"),
        }
    }
}

impl Key<String> for BoughtItems {
    fn get_key(&self) -> String {
        format!(
            "{}@{}",
            self.receipt_id,
            self.store_id,
        )
    }
}

