#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod file_handler;
mod appenders;
mod getters;

use file_handler::{make_file, load_file, save_file};
use appenders::{append_item, append_category, append_store, append_receipt};
use getters::{get_mappable, get_arr_items, get_arr_stores, get_item_height};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            make_file,
            load_file,
            save_file,
            append_category,
            append_item,
            append_store,
            append_receipt,
            get_mappable,
            get_arr_stores,
            get_arr_items,
            get_item_height,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

