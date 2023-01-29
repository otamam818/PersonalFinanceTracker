//! Provides insight about the the current user data
use pf_tracker_lib::DataMap;

#[tauri::command]
pub fn all_empty(data_map: DataMap) -> bool {
    data_map.receipts.is_none() &&
    data_map.items.is_none() &&
    data_map.stores.is_none() &&
    data_map.category.is_none()
}

