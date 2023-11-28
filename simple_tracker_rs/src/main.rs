use inquire_handler::ask_main;

mod sql_handler;
mod inquire_handler;
mod shared;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    sql_handler::initialize().await?;

    ask_main().await;

    Ok(())
}
