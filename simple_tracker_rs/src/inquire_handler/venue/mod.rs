use inquire::*;

use crate::{sql_handler::read_data::{get_name_list, self}, shared::TransactionEntity};

pub async fn ask_add_location() -> String {
    let options = vec!["Previously added location", "New Location"];

    let message = "Add a location";
    let ans: Result<&str, InquireError> = Select::new(message, options).prompt();
    // Key -> The name of the item; value -> The quantity of the item

    match ans {
        Ok("Previously added location") => add_from_previous_locations().await,
        Ok("New Location") => add_new_location().await,
        Err(kind) => panic!("Error found with message: {kind}"),
        _ => panic!("An invalid option was chosen!"),
    }
}

async fn add_from_previous_locations() -> String {
    let binding: Vec<String> = get_name_list(TransactionEntity::Item).await;

    let options: Vec<&str> = binding.iter().map(|s| s.as_str()).collect();

    if options.len() == 0 {
        println!("No previous locations exist! Please add a location first");
        return add_new_location().await;
    }

    let message = "Select a location";
    let ans: Result<&str, InquireError> = Select::new(message, options).prompt();
    dbg!(&ans);

    match ans {
        Ok(chosen_location) => chosen_location.to_string(),
        Err(kind) => panic!("location not found with error: {kind:?}"),
    }
}

pub async fn add_new_location() -> String {
    loop {
        match Text::new("Location name:").prompt() {
            Ok(value) => {
                let location_exists = read_data::check_if_location_exists(&value).await;
                if location_exists {
                    println!("Location already exists, please add a unique location");
                    continue;
                }
                break value;
            }
            Err(kind) => panic!("Error: {kind}"),
        }
    }
}
