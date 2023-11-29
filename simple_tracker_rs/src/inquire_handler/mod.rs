mod receipt;
mod venue;

use inquire::*;

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
        "Receipts" => receipt::ask_crud().await,
        "Items" => {},
        "Restaurants/Stores" => {},
        "Categories" => {},
        "Units" => {},
        _ => panic!("An invalid choice was made!")
    }
}
