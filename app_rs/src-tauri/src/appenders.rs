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

