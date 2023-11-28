use std::collections::HashMap;

use inquire::{*, formatter::MultiOptionFormatter, validator::Validation, list_option::ListOption};

use crate::sql_handler::{read_data::get_prev_items, create_data::insert_item};

type ItemMap = HashMap<String, usize>;

/// Asks the user what they want to do.
/// Returns whether the user wants to quit or not
/// NOTE: If the program logic becomes complicated, this can be extended into
///       an enum
pub async fn ask_main() -> bool {
    // Ask them about what they want to manage
    let options: Vec<&str> = vec![
        "Receipts",
        "Items",
        "Restaurants/Stores",
        "Categories",
        "Units",
        "Quit"
    ];

    let ans: Result<&str, InquireError> = Select::new("What do you want to manage?", options).prompt();

    match ans {
        Ok("Quit") => {
            println!("Okay then, see you next time!");
            return true;
        }
        Ok(choice) => handle_management(choice).await,
        Err(_) => println!("There was an error, please try again"),
    }

    false
}

async fn handle_management(choice: &str) {
    match choice {
        "Receipts" => ask_crud_receipts().await,
        "Items" => {},
        "Restaurants/Stores" => {},
        "Categories" => {},
        "Units" => {},
        _ => panic!("An invalid choice was made!")
    }
}

async fn ask_crud_receipts() {
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
    let options = vec![
        "Previously added items",
        "New Item",
        "I'm done adding items"
    ];

    let message = "Add an item";
    let ans: Result<&str, InquireError> = Select::new(message, options).prompt();
    // Key -> The name of the item; value -> The quantity of the item
    let mut items_chosen = HashMap::<String, usize>::new();

    match ans {
        Ok("Previously added items") => add_from_previous_items(&mut items_chosen).await,
        Ok("New Item") => add_new_item(&mut items_chosen).await,
        Ok("I'm done adding items") => {},
        Err(kind) => panic!("Error found with message: {kind}"),
        _ => panic!("An invalid option was chosen!"),
    }
}

async fn add_from_previous_items(items_chosen: &mut ItemMap) {
    let binding: Vec<String> = get_prev_items().await;

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

async fn add_new_item(items_chosen: &mut ItemMap) {
    let name = match Text::new("Item name:").prompt() {
        Ok(value) => value,
        Err(kind) => panic!("Error: {kind}")
    };

    // TODO: Add a category parser
    let category: Option<u32> = None;

    // Parse the price
    let price = match CustomType::<f32>::new("Price:").prompt() {
        Ok(value) => value,
        Err(kind) => panic!("Error on custom type: {kind:?}")
    };

    // Insert it into the database
    insert_item(&name, category, price).await;
    let quantity = match CustomType::<usize>::new("How many?").prompt() {
        Ok(value) => value,
        Err(kind) => panic!("Error on custom type: {kind:?}")
    };
    items_chosen.insert(name, quantity);
}