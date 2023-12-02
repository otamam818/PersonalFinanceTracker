use inquire::{
    *,
    formatter::MultiOptionFormatter,
    validator::Validation,
    list_option::ListOption
};

use crate::{
    shared::{
        ItemList,
        TransactionEntity
    },
    sql_handler::{
        read_data::{get_name_list, self, get_venue_id_from_name},
        models::{receipt::ReceiptBuilder, item::ItemBuilder}
    }
};

pub async fn ask_crud() {
    let options: Vec<&str> = vec![
        // Create
        "Create a new receipt",
        // Read
        "View an existing receipt",
        // Update
        "Modify an existing receipt",
        // Delete
        "Delete a receipt",
    ];

    let message = "What do you want to do with your receipts?";
    let ans: Result<&str, InquireError> = Select::new(message, options).prompt();

    match ans {
        Ok("Create a new receipt") => create_receipt().await,
        Ok("View an existing receipt") => {},
        Ok("Modify an existing receipt") => {},
        Ok("Delete a receipt") => {},
        _ => panic!("An invalid option was chosen!"),
    }
}

async fn create_receipt() {
    let chosen_location: String;
    if get_name_list(TransactionEntity::Venue).await.len() == 0 {
        println!("No previous locations found");
        chosen_location = add_new_location().await;
    } else {
        chosen_location = ask_add_location().await;
    }

    let venue_id = get_venue_id_from_name(&chosen_location).await;

    let chosen_date = add_new_date().await;

    let item_list = ask_item_list().await;

    ReceiptBuilder::new()
        .with_date(chosen_date)
        .with_item_list(item_list)
        .with_venue_id(venue_id)
        .insert_to_database()
        .await
        .unwrap();
}

async fn ask_item_list() -> ItemList {
    // Key -> The name of the item; value -> The quantity of the item
    let mut item_list = Vec::new();
    let options = vec![
        "Previously added items",
        "New Item",
        "I'm done adding items"
    ];

    let message = "Add an item";
    let ans: Result<&str, InquireError> = Select::new(message, options).prompt();

    match ans {
        Ok("Previously added items") => add_from_previous_items(&mut item_list).await,
        Ok("New Item") => add_new_item(&mut item_list).await,
        Ok("I'm done adding items") => {},
        Err(kind) => panic!("Error found with message: {kind}"),
        _ => panic!("An invalid option was chosen!"),
    };

    item_list
}

async fn ask_add_location() -> String {
    let options = vec![
        "Previously added location",
        "New Location",
    ];

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

async fn add_from_previous_items(items_chosen: &mut ItemList) {
    let binding: Vec<String> = get_name_list(TransactionEntity::Item).await;

    let options: Vec<&str> = binding
        .iter()
        .map(|s| s.as_str())
        .collect();

    if options.len() == 0 {
        println!("No previous items exist! Please add an item first");
        add_new_item(items_chosen).await;
        return;
    }

    let validator = |a: &[ListOption<&&str>]| {
        if a.len() < 1 {
            return Ok(Validation::Invalid("This list is too small!".into()));
        }

        Ok(Validation::Valid)
    };

    let formatter: MultiOptionFormatter<'_, &str> = &|_| "Items chosen".to_string();

    let ans = MultiSelect::new("Choose items for the new receipt:", options)
        .with_validator(validator)
        .with_formatter(formatter)
        .prompt();

    dbg!(&ans);

    match ans {
        Ok(_) => println!("I'll get right on it"),
        Err(_) => println!("The shopping list could not be processed"),
    }
}

async fn add_from_previous_locations() -> String {
    let binding: Vec<String> = get_name_list(TransactionEntity::Item).await;

    let options: Vec<&str> = binding
        .iter()
        .map(|s| s.as_str())
        .collect();

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

async fn add_new_item(items_chosen: &mut ItemList) {
    let name = match Text::new("Item name:").prompt() {
        Ok(value) => value,
        Err(kind) => panic!("Error: {kind}")
    };

    // TODO: Add a category parser
    // let category: Option<u32> = None;

    // Parse the price
    let price = match CustomType::<f64>::new("Price:").prompt() {
        Ok(value) => value,
        Err(kind) => panic!("Error on custom type: {kind:?}")
    };

    let quantity = match CustomType::<i64>::new("How many?").prompt() {
        Ok(value) => value,
        Err(kind) => panic!("Error on custom type: {kind:?}")
    };

    // Add it into the map
    let item_builder = ItemBuilder::new()
        .with_current_price(price)
        .with_name(name);
    items_chosen.push((item_builder, quantity));
}

async fn add_new_location() -> String {
    loop {
        match Text::new("Location name:").prompt() {
            Ok(value) => {
                let location_exists = read_data::check_if_location_exists(&value).await;
                if location_exists {
                    println!("Location already exists, please add a unique location");
                    continue;
                }
                break value;
            },
            Err(kind) => panic!("Error: {kind}")
        }
    }
}

async fn add_new_date() -> Option<String> {
    let validator = |s: &String| {
        if s.len() == 0 {
            return Ok(Validation::Valid);
        }

        // Check if it can be split into 3 numerical components
        let split_list: Vec<&str> = s
            .split('/')
            .map(|inner| inner.trim())
            .filter(|inner| !inner.is_empty())
            .collect();
        if split_list.len() != 3 {
            let err_msg = "Error an invalid format was used";
            return Ok(Validation::Invalid(err_msg.into()));
        }
        Ok(Validation::Valid)
    };

    let entered_date = CustomType::<String>::new("Enter a date")
        .with_validator(validator)
        .prompt();
    if let Err(kind) = entered_date {
        panic!("Something wrong happened: {kind:?}");
    }
    let entered_date = entered_date.unwrap();

    if entered_date.len() == 0 {
        return None;
    }

    Some(entered_date)
}
