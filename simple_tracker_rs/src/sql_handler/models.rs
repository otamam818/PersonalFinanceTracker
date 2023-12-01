use crate::shared::{DbIdNumber, DynamicError};

struct ItemInserter {
    id: DbIdNumber,
    name: String,
    category_id: DbIdNumber,
    current_price: f64,
}

struct ReceiptInserter {
    id: DbIdNumber,
    venue_id: DbIdNumber,
    date: String,
}

struct ReceiptBuilder {
    id: Option<DbIdNumber>,
    venue_id: Option<DbIdNumber>,
    date: Option<String>,
    // The item itself and the quantity of it bought at a given time
    items: Vec<(ItemBuilder, usize)>,
}

impl ReceiptBuilder {
    pub fn new() -> Self {
        Self {
            id: None,
            venue_id: None,
            date: None,
            items: vec![],
        }
    }

    pub async fn build(self) -> Result<(), DynamicError> {
        let (Some(id), Some(venue_id), Some(date)) = (self.id, self.venue_id, self.date) else {
            return Err("BuildNonExhaustive".into());
        };
        Ok(())
    }
}

pub struct ItemBuilder {
    pub id: Option<DbIdNumber>,
    pub name: Option<String>,
    pub category_id: Option<DbIdNumber>,
    pub current_price: Option<f64>,
}

impl ItemBuilder {
    pub fn new() -> Self {
        Self {
            id: None,
            name: None,
            category_id: None,
            current_price: None,
        }
    }

    pub fn insert_item() -> Result<(), DynamicError> {
        Ok(())
    }
}
