use inquire::{*, validator::Validation};

use crate::{sql_handler::{read_data::{get_name_list, get_venue_id_from_name}, models::receipt::ReceiptBuilder}, shared::TransactionEntity, inquire_handler::{venue, item}};

const EPOCH_YEAR_YY: usize = 70;
const EPOCH_YEAR_YYYY: usize = 1970;
const CURRENT_YEAR_YY: usize = 23;
const CURRENT_YEAR_YYYY: usize = 2023;

pub async fn create_receipt() {
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

pub async fn add_new_date() -> Option<String> {
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
        // Check that the year is in either YY or YYYY format
        let year: usize = match split_list[3].parse() {
            Ok(number) => number,
            Err(kind) => return Ok(Validation::Invalid(kind.into())),
        };

        let invalid_range = year > CURRENT_YEAR_YY
            && year > CURRENT_YEAR_YYYY
            && year < EPOCH_YEAR_YY
            && year < EPOCH_YEAR_YYYY;
        if invalid_range {
            return Ok(Validation::Invalid("Invalid year range".into()));
        }
        Ok(Validation::Valid)
    };

    let entered_date = CustomType::<String>::new("Enter a date")
        .with_validator(validator)
        .with_help_message("Format: dd/mm/yyyy")
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