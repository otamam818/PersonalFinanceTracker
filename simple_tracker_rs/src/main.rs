mod sql_handler;
mod shared;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    sql_handler::initialize().await?;
    Ok(())
}
