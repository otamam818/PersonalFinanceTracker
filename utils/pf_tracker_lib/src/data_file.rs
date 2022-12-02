use std::{fs, fmt::Debug};
use serde_derive::{Deserialize, Serialize};
use std::collections::HashMap;
use crate::receipt::{Receipt, Item, Store, Category, BoughtItems};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DataFile {
    pub receipts: Vec<Receipt>,
    pub items: Vec<Item>,
    pub stores: Vec<Store>,
    pub category: Vec<Category>,
    pub bought_items: Vec<BoughtItems>
}

impl DataFile {
    pub fn init_file(file_path: &str) -> std::io::Result<()> {
        let data = DataFile {
            receipts: vec![],
            items: vec![],
            stores: vec![],
            category: vec![],
            bought_items: vec![],
        };
        fs::write(file_path, toml::to_string(&data).unwrap())?;
        Ok(())
    }

    pub fn read_file(file_path: &str) -> Option<DataFile> {
        let chosen_file = &fs::read_to_string(file_path).unwrap();
        match toml::from_str(chosen_file) {
            Ok(data) => Some(data),
            Err(_) => None
        }
    }
    
    pub fn update_file(&self, file_path: &str) -> std::io::Result<()> {
        fs::write(file_path, toml::to_string(self).unwrap())?;
        Ok(())
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DataMap {
    pub receipts: HashMap<String, Receipt>,
    pub items: HashMap<u16, Item>,
    pub stores: HashMap<u8, Store>,
    pub category: HashMap<u16, Category>,
    pub bought_items: HashMap<String, BoughtItems>
}

impl DataMap {
    #[allow(non_snake_case)]
    pub fn from_DataFile(data: DataFile) -> DataMap {
        DataMap {
            receipts: data.receipts
                .iter()
                .map(|atom| (format!(
                    "{}|{}|{}",
                    atom.date,
                    atom.time,
                    atom.store_id), atom.to_owned())
                ).collect::<HashMap<String, Receipt>>(),
            items: data.items
                .iter()
                .map(|atom| (atom.id, atom.to_owned())
                ).collect::<HashMap<u16, Item>>(),
            stores: data.stores
                .iter()
                .map(|atom| (atom.id, atom.to_owned())
                ).collect::<HashMap<u8, Store>>(),
            category: data.category                .iter()
                .map(|atom| (atom.id, atom.to_owned())
                ).collect::<HashMap<u16, Category>>(),
            bought_items: data.bought_items
                .iter()
                .map(|atom| (format!(
                    "{}|{}|{}",
                    atom.item_id,
                    atom.store_id,
                    atom.receipt_id), atom.to_owned())
                ).collect::<HashMap<String, BoughtItems>>(),
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::data_file::DataFile;

    use super::DataMap;

    #[test]
    fn test_write() {
        match DataFile::init_file("hello_world.toml") {
            Ok(_) => {},
            Err(_) => assert!(false)
        };
    }

    #[test]
    fn test_read() {
        match DataFile::read_file("hello_world.toml") {
            Some(data) => dbg!(data),
            None => panic!("No file found")
        };
    }

    #[test]
    fn check_map() {
        // Only prints the result
        dbg!(DataMap::from_DataFile(
                DataFile::read_file("hello_world.toml")
                .unwrap())
            );
    }
}
