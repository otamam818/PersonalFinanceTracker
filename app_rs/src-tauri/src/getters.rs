use pf_tracker_lib::{DataMap, DataFile, receipt::{Store, Item}};

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

