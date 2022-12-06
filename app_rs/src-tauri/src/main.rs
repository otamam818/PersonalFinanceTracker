#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use pf_tracker_lib;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            load_file,
            get_mappable,
            append_category,
            append_item
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn load_file(path: &str) -> pf_tracker_lib::DataFile {
    pf_tracker_lib::DataFile::read_file(path).unwrap()
}

#[tauri::command]
fn get_mappable(data_file: pf_tracker_lib::DataFile) -> pf_tracker_lib::DataMap {
    pf_tracker_lib::DataMap::from_DataFile(data_file)
}

#[tauri::command]
fn append_category(
    data_map: pf_tracker_lib::DataMap,
    name: String,
    description: String
    ) -> pf_tracker_lib::DataMap
{
    data_map.append_category(name, description)
}

#[tauri::command]
fn append_item(
    data_map: pf_tracker_lib::DataMap,
    name: String,
    price: String,
    currency: String
    ) -> pf_tracker_lib::DataMap
{
    let price: f32 = price.parse().unwrap();
    data_map.append_item(name, price, currency)
}

