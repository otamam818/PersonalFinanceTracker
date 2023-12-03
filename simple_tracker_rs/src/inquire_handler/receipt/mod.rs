use inquire::{validator::Validation, *};

use crate::{
    shared::TransactionEntity,
    sql_handler::{
        models::receipt::ReceiptBuilder,
        read_data::{get_name_list, get_venue_id_from_name},
    },
    inquire_handler::{venue, item},
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
        Ok("View an existing receipt") => todo!(),
        Ok("Modify an existing receipt") => todo!(),
        Ok("Delete a receipt") => todo!(),
        _ => panic!("An invalid option was chosen!"),
    }
}

async fn create_receipt() {
    let chosen_location: String;
    if get_name_list(TransactionEntity::Venue).await.len() == 0 {
        println!("No previous locations found");
        chosen_location = venue::add_new_location().await;
    } else {
        chosen_location = venue::ask_add_location().await;
    }

    let venue_id = get_venue_id_from_name(&chosen_location).await;

    let chosen_date = add_new_date().await;

    let item_list = item::ask_item_list().await;

    ReceiptBuilder::new()
        .with_date(chosen_date)
        .with_item_list(item_list)
        .with_venue_id(venue_id)
        .insert_to_database()
        .await
        .unwrap();
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
