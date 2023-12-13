use inquire::{formatter::MultiOptionFormatter, list_option::ListOption, validator::Validation, *};

use crate::{
    shared::{DbIdNumber, ItemList, TransactionEntity},
    sql_handler::{models::item::ItemBuilder, read_data::get_name_list},
};

use super::category;

pub async fn ask_crud() {
    let options: Vec<&str> = vec![
        // Create
        "Create a new item",
        // Read
        "View an existing item",
        // Update
        "Modify an existing item",
        // Delete
        "Delete a item",
    ];

    let message = "What do you want to do with your items?";
    let ans = Select::new(message, options).prompt();
    let mut item_list = Vec::new();

    match ans {
        Ok("Create a new item") => {
            let item_builder = add_new_item().await;
            let quantity = ask_quantity();
            item_list.push((item_builder, quantity));
        },
        Ok("View an existing item") => view_existing_items().await,
        Ok("Modify an existing item") => todo!(),
        Ok("Delete a item") => todo!(),
        _ => panic!("An invalid option was chosen!"),
    }
}

async fn add_new_item() -> ItemBuilder {
    let name = match Text::new("Item name:").prompt() {
        Ok(value) => value,
        Err(kind) => panic!("Error: {kind}"),
    };

    // Ask for (or make) a new category for the item
    let category: Option<DbIdNumber> = category::add_from_previous_categories().await;

    // Parse the price
    let price = match CustomType::<f64>::new("Price:").prompt() {
        Ok(value) => value,
        Err(kind) => panic!("Error on custom type: {kind:?}"),
    };

    // Add it into the map
    let item_builder = ItemBuilder::new()
        .with_current_price(price)
        .with_name(name)
        .with_category_id(category);
    item_builder
    // items_chosen.push((item_builder, quantity));
}

fn ask_quantity() -> DbIdNumber {
    let quantity = match CustomType::<DbIdNumber>::new("How many?").prompt() {
        Ok(value) => value,
        Err(kind) => panic!("Error on custom type: {kind:?}"),
    };

    quantity
}

async fn view_existing_items() {

}

pub async fn ask_item_list() -> ItemList {
    let mut item_list = Vec::new();
    let options = vec![
        "Previously added items",
        "New Item",
        "I'm done adding items",
    ];

    loop {
        let message = "Add an item";
        let ans: Result<&str, InquireError> = Select::new(message, options.clone()).prompt();

        match ans {
            Ok("Previously added items") => add_from_previous_items(&mut item_list).await,
            Ok("New Item") => {
                let item_builder = add_new_item().await;
                let quantity = ask_quantity();
                item_list.push((item_builder, quantity));
            },
            Ok("I'm done adding items") => break,
            Err(kind) => panic!("Error found with message: {kind}"),
            _ => panic!("An invalid option was chosen!"),
        };
    }

    item_list
}

async fn add_from_previous_items(items_chosen: &mut ItemList) {
    let binding: Vec<String> = get_name_list(TransactionEntity::Item).await;

    let options: Vec<&str> = binding.iter().map(|s| s.as_str()).collect();

    if options.len() == 0 {
        println!("No previous items exist! Please add an item first");
        let item_builder = add_new_item().await;
        let quantity = ask_quantity();
        items_chosen.push((item_builder, quantity));
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
