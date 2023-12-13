pub mod create;
pub mod read;

use inquire::*;

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
    let ans = Select::new(message, options).prompt();

    match ans {
        Ok("Create a new receipt") => create::create_receipt().await,
        Ok("View an existing receipt") => read::view_receipt().await,
        Ok("Modify an existing receipt") => todo!(),
        Ok("Delete a receipt") => todo!(),
        _ => panic!("An invalid option was chosen!"),
    }
}
