use inquire::{formatter::MultiOptionFormatter, list_option::ListOption, validator::Validation, *};

use crate::{
    shared::{DbIdNumber, ItemList, TransactionEntity},
    sql_handler::{models::item::ItemBuilder, read_data::get_name_list},
};

use super::category;

pub async fn ask_item_list() -> ItemList {
    // Key -> The name of the item; value -> The quantity of the item
    let mut item_list = Vec::new();
    let options = vec![
        "Previously added items",
        "New Item",
        "I'm done adding items",
    ];

    let message = "Add an item";
    let ans: Result<&str, InquireError> = Select::new(message, options).prompt();

    match ans {
        Ok("Previously added items") => add_from_previous_items(&mut item_list).await,
        Ok("New Item") => add_new_item(&mut item_list).await,
        Ok("I'm done adding items") => {}
        Err(kind) => panic!("Error found with message: {kind}"),
        _ => panic!("An invalid option was chosen!"),
    };

    item_list
}

async fn add_from_previous_items(items_chosen: &mut ItemList) {
    let binding: Vec<String> = get_name_list(TransactionEntity::Item).await;

    let options: Vec<&str> = binding.iter().map(|s| s.as_str()).collect();

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

async fn add_new_item(items_chosen: &mut ItemList) {
    let name = match Text::new("Item name:").prompt() {
        Ok(value) => value,
        Err(kind) => panic!("Error: {kind}"),
    };

    // TODO: Add a category parser
    let category: Option<DbIdNumber> = category::add_from_previous_categories().await;

    // Parse the price
    let price = match CustomType::<f64>::new("Price:").prompt() {
        Ok(value) => value,
        Err(kind) => panic!("Error on custom type: {kind:?}"),
    };

    let quantity = match CustomType::<i64>::new("How many?").prompt() {
        Ok(value) => value,
        Err(kind) => panic!("Error on custom type: {kind:?}"),
    };

    // Add it into the map
    let item_builder = ItemBuilder::new()
        .with_current_price(price)
        .with_name(name)
        .with_category_id(category);
    items_chosen.push((item_builder, quantity));
}
