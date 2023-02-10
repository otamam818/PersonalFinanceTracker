//! Acts as an interface that gets various sub-sections from the main storage
//! structure: the DataMap
use pf_tracker_lib::{
    DataMap,
    DataFile,

    receipt::{
        Store,
        Item,
        Receipt
    },

    displayable::ReceiptHistory
};

#[tauri::command]
pub fn get_mappable(data_file: DataFile) -> DataMap {
    DataMap::from_DataFile(data_file)
}

#[tauri::command]
pub fn get_arr_stores(
    data_map: DataMap,
    ) -> Vec<Store>
{
    DataMap::get_arr_stores(data_map)
}

#[tauri::command]
pub fn get_arr_items(
    data_map: DataMap,
    ) -> Vec<Item>
{
    DataMap::get_arr_items(data_map)
}

#[tauri::command]
pub fn get_item_height (
    data_map: DataMap,
    ) -> i32
{
    match data_map.items {
        Some(_) => 180,
        None => 120
    }
}

#[tauri::command]
pub fn get_receipt_history (
    key: &str,
    data_map: DataMap,
    ) -> ReceiptHistory
{
    ReceiptHistory::from_DataMap(key, data_map)
}

#[tauri::command]
pub fn get_receipt_of(data: DataMap, key: String) -> Option<Receipt> {
    data.get_receipt_of(key)
}

