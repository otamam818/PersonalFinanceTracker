//! Handles the various file IO operations, acting as an
//! interface between the local storage and application
use pf_tracker_lib::{DataMap, DataFile};

#[tauri::command]
pub fn make_file (location: String) {
    match DataFile::init_file(&location) {
        Ok(_) => {},
        Err(msg) => println!("Invalid read: {:?}", msg)
    }
}

#[tauri::command]
pub fn load_file(path: &str) -> DataFile {
    DataFile::read_file(path).unwrap()
}

#[tauri::command]
pub fn save_file(data_map: DataMap, file_path: &str) -> bool {
    println!("{}", file_path);
    match DataMap::to_DataFile(data_map).update_file(file_path) {
        Ok(_) => true,
        Err(_) => false
    }
}
