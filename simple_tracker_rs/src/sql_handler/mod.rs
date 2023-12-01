// CRUD modules
pub mod read_data;
pub mod create_data;
pub mod models;

// Private modules
mod create_tables;

use sqlx::{SqliteConnection, Acquire};
use crate::shared::{DATABASE_NAME, connect_prod, DynamicError};

pub async fn initialize() -> Result<(), DynamicError> {
    let file_exists = std::fs::metadata(DATABASE_NAME).is_ok();
    let mut pool = connect_prod().await;

    if !file_exists {
        create_tables::execute(&mut pool).await?;
        create_default_values(&mut pool).await?;
    }

    Ok(())
}

pub async fn create_default_values(pool: &mut SqliteConnection) -> Result<(), DynamicError> {
    const ALL_UNITS: [&str; 5] = [
        "kg",
        "g",
        "litre(s)",
        "millilitre(s)",
        "unit(s)",
    ];

    // Insert default units (kg, etc)
    for unit in ALL_UNITS.iter().enumerate() {
        let conn = pool.acquire().await?;
        let id = unit.0.to_string();
        sqlx::query!("
            INSERT INTO unit (id, name)
            VALUES (?, ?)
        ", id, unit.1).execute(conn).await?;
    }

    // Insert default unit-conversions (kg, etc)
    let conn = pool.acquire().await?;
    sqlx::query!("
        INSERT INTO unit_converter (from_id, to_id, multiplier)
        VALUES
            -- kg to g
            (0, 1, 1000),
            -- g to kg
            (1, 0, 0.001),
            -- l to ml
            (2, 3, 1000),
            -- ml to l
            (3, 2, 0.001);
    ").execute(conn).await?;

    Ok(())
}