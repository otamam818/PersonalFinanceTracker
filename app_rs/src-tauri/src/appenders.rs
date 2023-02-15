//! Adds extra pieces of data to the DataMap and returns the modified
//! DataMap struct
use pf_tracker_lib::DataMap;

#[tauri::command]
pub fn append_category(
    data_map: DataMap,
    name: String,
    description: String
    ) -> DataMap
{
    data_map.append_category(name, description)
}

#[tauri::command]
pub fn append_item(
    data_map: DataMap,
    name: String,
    price: String,
    currency: String
    ) -> DataMap
{
    data_map.append_item(name, price, currency)
}

#[tauri::command]
pub fn append_store (
    data_map: DataMap,
    name: String,
    location: String
    ) -> DataMap
{
    data_map.append_store(name, location)
}

#[tauri::command]
pub fn append_receipt (
    data_map: DataMap,
    store_id: String,
    date: Vec<u8>,
    time: Vec<u8>,
    items: Vec<Vec<u16>>
    ) -> DataMap
{
    data_map.append_receipt(store_id, date, time, items)
}

#[tauri::command]
pub fn update_receipt (
    data_map: DataMap,
    store_id: String,
    date: Vec<u8>,
    time: Vec<u8>,
    items: Vec<Vec<u16>>,
    receipt_key: String
    ) -> DataMap
{
    data_map.update_receipt(store_id, date, time, items, receipt_key)
}

#[tauri::command]
pub fn delete_receipt_by_key (
    data_map: DataMap,
    receipt_key: String
    ) -> DataMap
{
    data_map.delete_receipt_by_key(receipt_key)
}
