use serde_derive::{Deserialize, Serialize};
use std::collections::HashMap;
use crate::receipt::{Receipt, Item, Store, Category, BoughtItems, Key};
use crate::data_file::DataFile;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DataMap {
    pub receipts: HashMap<String, Receipt>,
    pub items: HashMap<u16, Item>,
    pub stores: HashMap<String, Store>,
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
        price: String,
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

    pub fn append_store(mut self, name: String, location: String) -> DataMap {
        let location = if location.eq("") {None} else {Some(location)};
        let store = Store { location, name };
        let id = store.get_key();

        self.stores.insert(id, store);
        self
    }

    pub fn get_arr_stores(data: DataMap) -> Vec<Store> {
        get_arr(data.stores)
    }

    pub fn get_arr_items(data: DataMap) -> Vec<Item> {
        get_arr(data.items)
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
