use serde_derive::{Deserialize, Serialize};
use std::collections::HashMap;
use crate::{receipt::{Receipt, Item, Store, Category}, key::Key, Date, Time};
use crate::data_file::DataFile;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DataMap {
    pub receipts: Option<HashMap<String, Receipt>>,
    pub items: Option<HashMap<u16, Item>>,
    pub stores: Option<HashMap<String, Store>>,
    pub category: Option<HashMap<u16, Category>>,
}

impl DataMap {
    #[allow(non_snake_case)]
    pub fn from_DataFile(data: DataFile) -> DataMap {
        DataMap {
            receipts: get_hashmap(data.receipts),
            items: get_hashmap(data.items),
            stores: get_hashmap(data.stores),
            category: get_hashmap(data.category),
        }
    }

    #[allow(non_snake_case)]
    pub fn to_DataFile(data: DataMap) -> DataFile {
        DataFile { 
            receipts: parse_option_arr(data.receipts),
            items: parse_option_arr(data.items),
            stores: parse_option_arr(data.stores),
            category: parse_option_arr(data.category),
        }
    }

    pub fn append_category(mut self, name: String, description: String) -> DataMap {
        match self.category {
            Some(mut category) => {
                let id = category.len() as u16;
                category.insert(
                    id,
                    Category {
                        id,
                        name,
                        description,
                        // TODO: Make this work more flexibly
                        sub_category: vec![]
                    });
                self.category = Some(category)
            },

            None => {
                let mut map = HashMap::new();
                map.insert(
                    0,
                    Category {id: 0, name, description,sub_category: vec![]}
                );

                self.category = Some(map);
            }
        }
        self
    }

    pub fn append_item(
        mut self,
        name: String,
        price: String,
        currency: String
        ) -> DataMap
    {
        match self.items {
            Some(ref mut items) => {
                let id = items.len() as u16;
                items.insert(
                    id,
                    Item {
                        id,
                        name,
                        prices: vec![price],
                        currency,
                        category_ids: vec![],
                });
            },

            None => {
                let mut map = HashMap::new();
                map.insert(
                    0,
                    Item {
                        id: 0,
                        name,
                        prices: vec![price],
                        currency,
                        category_ids: vec![],
                    }
                );

                self.items = Some(map);
            }
        }
        self
    }

    pub fn append_store(mut self, name: String, location: String) -> DataMap {
        let location = if location.eq("") {None} else {Some(location)};
        let store = Store { location, name };
        let id = store.get_key();

        match self.stores {
            Some(ref mut hash_map) => { hash_map.insert(id, store) ;},
            None => {
                let mut hash_map = HashMap::new();
                hash_map.insert(id, store);
                self.stores = Some(hash_map);
            }
        };
        self
    }

    pub fn append_receipt(
        mut self,
        store_id: String,
        date: Vec<u8>,
        time: Vec<u8>,
        items: Vec<Vec<u16>>
    ) -> DataMap {
        const VALIDATED_FRONT_END: &'static str
            = "Has been validated from the front-end";

        // Prepares the data for the receipt
        assert!(date.len() == 3);
        let date = Date::new(date[0], date[1], date[2] as u32)
            .expect(VALIDATED_FRONT_END);
        assert!(time.len() == 2);
        let time = Time::new(time[0], time[1])
            .expect(VALIDATED_FRONT_END);

        let items: HashMap<String, u16> = items
            .iter()
            .map(|arr| (arr[0].to_string(), arr[1]))
            .collect();

        // Appends a single receipt to the datamap
        let receipt = Receipt {
            date,
            time,
            store_id: store_id.clone(),
            items
        };

        // TODO: Make code DRY
        let key = receipt.get_key();

        match self.receipts {
            Some(ref mut hash_map) => { hash_map.insert(key.clone(), receipt) ;},
            None => {
                let mut hash_map = HashMap::new();
                hash_map.insert(key.clone(), receipt);
                self.receipts = Some(hash_map);
            }
        };

        self
    }

    pub fn get_arr_stores(data: DataMap) -> Vec<Store> {
        get_arr(data.stores)
    }

    pub fn get_arr_items(data: DataMap) -> Vec<Item> {
        get_arr(data.items)
    }

    pub fn get_arr_receipts(data: DataMap) -> Vec<Receipt> {
        get_arr(data.receipts)
    }

    pub fn get_receipt_of(self, key: String) -> Option<Receipt> {
        match self.receipts {
            Some(hashmap) => Some(hashmap
                .get(&key)
                .expect("key should be valid")
                .clone()),
            None => None
        }
    }

    pub fn update_receipt(
        mut self,
        store_id: String,
        date: Vec<u8>,
        time: Vec<u8>,
        items: Vec<Vec<u16>>,
        receipt_key: String
    ) -> Self {
        const VALIDATED_FRONT_END: &'static str
            = "Has been validated from the front-end";

        // Prepares the data for the receipt
        assert!(date.len() == 3);
        let date = Date::new(date[0], date[1], date[2] as u32)
            .expect(VALIDATED_FRONT_END);
        assert!(time.len() == 2);
        let time = Time::new(time[0], time[1])
            .expect(VALIDATED_FRONT_END);

        let items: HashMap<String, u16> = items
            .iter()
            .map(|arr| (arr[0].to_string(), arr[1]))
            .collect();

        // Appends a single receipt to the datamap
        let receipt = Receipt {
            date,
            time,
            store_id: store_id.clone(),
            items
        };

        self
            .receipts
            .as_mut()
            .expect("At this point a HashMap should exist,\
                else there is a logic error in the front-end")
            .insert(receipt_key, receipt);
        self
    }
}

fn get_hashmap<T, U>(potential_list: Option<Vec<U>>) -> Option<HashMap<T, U>>
where
    T: std::hash::Hash + std::cmp::Eq,
    U: Key<T> + Clone
{
    match potential_list {
        Some(list) => Some(list
            .iter()
            .map(|atom| {
                let key = atom.get_key();
                let value = atom.to_owned();
                (key, value)
            })
            .collect::<HashMap<T, U>>()),
        None => None
    }
}

fn get_arr<T, U: Clone>(map: Option<HashMap<T, U>>) -> Vec<U> {
    match map {
        Some(hashmap) => { hashmap
            .iter()
            .map(|(_, atom)| atom.clone())
            .collect::<Vec<U>>()
        }
        None => vec![]
    }
}

fn parse_option_arr<T: Clone, U>(arr: Option<HashMap<U, T>>) -> Option<Vec<T>> {
    match arr {
        Some(map) => {match map.len() {
            0 => None,
            _ => Some(
                map
                .iter()
                .map(|(_, u)| u.clone())
                .collect::<Vec<T>>()
        )}},
        None => None
    }
}

