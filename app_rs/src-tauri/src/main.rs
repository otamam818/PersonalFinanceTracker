#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use pf_tracker_lib::{self, receipt::{Store, Item}, DataMap, DataFile};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            make_file,
            load_file,
            get_mappable,
            append_category,
            append_item,
            get_arr_stores,
            get_arr_items,
            append_store,
            get_item_height,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn make_file (location: String) {
    match DataFile::init_file(&location) {
        Ok(_) => {},
        Err(msg) => println!("Invalid read: {:?}", msg)
    }
}

#[tauri::command]
fn load_file(path: &str) -> DataFile {
    DataFile::read_file(path).unwrap()
}

#[tauri::command]
fn get_mappable(data_file: DataFile) -> DataMap {
    DataMap::from_DataFile(data_file)
}

#[tauri::command]
fn append_category(
    data_map: DataMap,
    name: String,
    description: String
    ) -> DataMap
{
    data_map.append_category(name, description)
}

#[tauri::command]
fn append_item(
    data_map: DataMap,
    name: String,
    price: String,
    currency: String
    ) -> DataMap
{
    data_map.append_item(name, price, currency)
}

#[tauri::command]
fn get_arr_stores(
    data_map: DataMap,
    ) -> Vec<Store>
{
    DataMap::get_arr_stores(data_map)
}

#[tauri::command]
fn get_arr_items(
    data_map: DataMap,
    ) -> Vec<Item>
{
    DataMap::get_arr_items(data_map)
}

#[tauri::command]
fn append_store (
    data_map: DataMap,
    name: String,
    location: String
    ) -> DataMap
{
    data_map.append_store(name, location)
}

#[tauri::command]
fn get_item_height (
    data_map: DataMap,
    ) -> i32
{
    if data_map.items.is_empty() {
        120
    } else {
        180
    }
}

