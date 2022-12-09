use std::{fs, fmt::Debug};
use serde_derive::{Deserialize, Serialize};
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
    fn check() {
        // Only prints the result
    }
}
