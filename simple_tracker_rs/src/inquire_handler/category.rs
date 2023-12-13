use crate::{
    shared::{connect_prod, DbIdNumber, TransactionEntity},
    sql_handler::read_data::get_name_list,
};
use inquire::*;
use sqlx::Acquire;

/// - Adds an item from any previous category within the database if it exists
/// - allows users to add a new category from here too
/// - users can also skip adding a category if "None" is chosen
/// 
/// `@returns` None if None was chosen, the categoryId if a category was chosen or made
pub async fn add_from_previous_categories() -> Option<DbIdNumber> {
    let binding: Vec<String> = get_name_list(TransactionEntity::Category).await;
    let mut pool = connect_prod().await;
    let mut conn = pool.begin().await.unwrap();
    let transaction = &mut conn;

    let mut options = vec!["None"];
    for option in binding.iter().map(|s| s.as_str()) {
        options.push(option);
    }
    options.push("New Category");

    let ans = Select::new("Choose categories for the new item:", options).prompt();

    let ans = match ans {
        Ok("None") => None,
        Ok("New Category") => Some(add_new_category(&mut conn).await),
        Ok(chosen_category) => {
            let id = fetch_id(chosen_category, transaction).await;
            Some(id)
        }
        Err(_) => panic!("The shopping list could not be processed"),
    };

    conn.commit().await.unwrap();
    ans
}

async fn add_new_category(transaction: &mut sqlx::Transaction<'_, sqlx::Sqlite>) -> DbIdNumber {
    let name = match Text::new("Category name:").prompt() {
        Ok(value) => value,
        Err(kind) => panic!("Error: {kind}"),
    };

    if !category_exists(&name, transaction).await {
        sqlx::query!("INSERT INTO category (name) VALUES (?)", name)
            .execute(&mut **transaction)
            .await
            .unwrap();
    }

    fetch_id(&name, transaction).await
}

pub async fn category_exists(
    candidate_name: &str,
    transaction: &mut sqlx::Transaction<'_, sqlx::Sqlite>,
) -> bool {
    sqlx::query!("SELECT * FROM category WHERE name == ?", candidate_name)
        .fetch_all(&mut **transaction)
        .await
        .unwrap()
        .len()
        != 0
}

pub async fn fetch_id(
    name: &str,
    transaction: &mut sqlx::Transaction<'_, sqlx::Sqlite>,
) -> DbIdNumber {
    sqlx::query!("SELECT id FROM category WHERE name == ?", name)
        .fetch_one(&mut **transaction)
        .await
        .unwrap()
        .id
}
