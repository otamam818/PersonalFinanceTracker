mod create_tables;

use sqlx::{ConnectOptions, sqlite::SqliteConnectOptions, SqliteConnection, Acquire};
use std::str::FromStr;

use crate::shared::DATABASE_NAME;

pub async fn initialize() -> Result<(), Box<dyn std::error::Error>> {
    let file_exists = std::fs::metadata(DATABASE_NAME).is_ok();
    let mut conn = SqliteConnectOptions::from_str(&format!("sqlite://{DATABASE_NAME}"))?
        .create_if_missing(true)
        .connect().await?;

    if !file_exists {
        create_tables::execute(&mut conn).await?;
    }

    create_default_values(&mut conn).await?;

    Ok(())
}

pub async fn create_default_values(pool: &mut SqliteConnection) -> Result<(), Box<dyn std::error::Error>> {
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

    // TODO: Insert default unit-conversions (kg, etc)
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