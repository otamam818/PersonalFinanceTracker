use std::{fs, fmt::Debug};
use serde_derive::{Deserialize, Serialize};
use std::collections::HashMap;
use crate::receipt::{Receipt, Item, Store, Category, BoughtItems, Key};

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
            receipts: get_hashmap(data.receipts),
            items: get_hashmap(data.items),
            stores: get_hashmap(data.stores),
            category: get_hashmap(data.category),
            bought_items: get_hashmap(data.bought_items),
        }
    }

    #[allow(non_snake_case)]
    pub fn to_DataFile(data: DataMap) -> DataFile {
        DataFile { 
            receipts: get_arr(data.receipts),
            items: get_arr(data.items),
            stores: get_arr(data.stores),
            category: get_arr(data.category),
            bought_items: get_arr(data.bought_items),
        }
    }

    pub fn append_category(mut self, name: String, description: String) -> DataMap {
        let id = self.category.len() as u16;
        self.category.insert(
            id,
            Category {
                id,
                name,
                description,
                sub_category: vec![]
            });
        self
    }

    pub fn append_item(
        mut self,
        name: String,
        price: f32,
        currency: String
        ) -> DataMap
    {
        let id = self.items.len() as u16;
        self.items.insert(
            id,
            Item {
                id,
                name,
                prices: vec![price],
                currency,
                category_ids: vec![],
            });
        self
    }
}

fn get_hashmap<T, U>(list: Vec<U>) -> HashMap<T, U>
where
    T: std::hash::Hash + std::cmp::Eq,
    U: Key<T> + Clone
{
    list
        .iter()
        .map(|atom| {
            let key = atom.get_key();
            let value = atom.to_owned();
            (key, value)
        })
        .collect::<HashMap<T, U>>()
}

fn get_arr<T, U: Clone>(hashmap: HashMap<T, U>) -> Vec<U> {
    hashmap
        .iter()
        .map(|atom| atom.1.to_owned())
        .collect()
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
