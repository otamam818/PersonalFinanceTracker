//! Acts as the interface between the tauri front-end and the library back-end
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod file_handler;
mod appenders;
mod getters;
mod data_insight;

use file_handler::{make_file, load_file, save_file};
use appenders::{
    append_item,
    append_category,
    append_store,
    append_receipt,
    update_receipt,
    delete_receipt_by_key
};
use getters::{
    get_mappable,
    get_arr_items,
    get_arr_stores,
    get_item_height,
    get_receipt_history,
    get_receipt_of,
};
use data_insight::all_empty;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            /* --------------*
             * FILE HANDLERS *
             * --------------*/
            make_file,
            load_file,
            save_file,

            /* --------------*
             * APPENDERS     *
             * --------------*/
            append_category,
            append_item,
            append_store,
            append_receipt,
            update_receipt,
            delete_receipt_by_key,

            /* --------------*
             * GETTERS       *
             * --------------*/
            get_mappable,
            get_arr_stores,
            get_arr_items,
            get_item_height,
            get_receipt_history,
            get_receipt_of,

            /* --------------*
             * DATA HANDLERS *
             * --------------*/
            all_empty,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

