use std::{fs, fmt::Debug};
use serde_derive::{Deserialize, Serialize};
use crate::receipt::{Receipt, Item, Store, Category};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DataFile {
    pub receipts: Option<Vec<Receipt>>,
    pub items: Option<Vec<Item>>,
    pub stores: Option<Vec<Store>>,
    pub category: Option<Vec<Category>>,
}

impl DataFile {
    pub fn init_file(file_path: &str) -> std::io::Result<()> {
        let data = DataFile {
            receipts: None,
            items: None,
            stores: None,
            category: None,
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
        let data = toml::to_string(&self);
        dbg!(&data, &self);
        fs::write(file_path, data.unwrap())?;
        Ok(())
    }
}


#[cfg(test)]
mod tests {
    use crate::{data_file::DataFile, receipt::{Category, Item, Store, BoughtItems}, Receipt, Date, Time};

    #[test]
    fn test_write() {
        match DataFile::init_file("hello_world.toml") {
            Ok(_) => {},
            Err(_) => assert!(false)
        };
    }

    #[test]
    fn test_read() {
        self::test_write();

        match DataFile::read_file("hello_world.toml") {
            Some(data) => dbg!(data),
            None => panic!("No file found")
        };
    }

    #[test]
    fn check() {
        // Only prints the result
    }

    #[test]
    fn check_save() {
        // Only prints the result
        let data = DataFile {
            receipts: vec![
                Receipt {
                    date: Date::new(12, 1, 12).unwrap(),
                    time: Time::new(12, 21).unwrap(),
                    store_id: 0
                }
            ],
            items: vec![
                Item {
                    id: 12,
                    name: "Chocolate".to_string(),
                    prices: vec!["12.5".to_string()],
                    currency: "AUD".to_string(),
                    category_ids: vec![]
                }
            ],
            stores: vec![
                Store {
                    location: None,
                    name: "Coles".to_string()
                }
            ],
            category: vec![
                Category {
                    id: 0,
                    name: "As".to_string(),
                    description: "sca".to_string(),
                    sub_category: vec![],
                },
            ],
        };

        println!("{:?}", toml::to_string(&data));
    }
}
