use sqlx::{Acquire, SqliteConnection};

pub async fn execute(pool: &mut SqliteConnection) -> Result<(), Box<dyn std::error::Error>> {
    let conn = pool.acquire().await?;
    sqlx::query!("CREATE TABLE IF NOT EXISTS venue (
        id INTEGER PRIMARY KEY,
        name TEXT,
        location TEXT
    )").execute(conn).await?;

    let conn = pool.acquire().await?;
    sqlx::query!("CREATE TABLE IF NOT EXISTS item (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        category_id INTEGER,
        current_price REAL NOT NULL
    );").execute(conn).await?;

    let conn = pool.acquire().await?;
    sqlx::query!("CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    );").execute(conn).await?;

    // Represents an item unit, such as kg, ml, L, per-each, etc.
    let conn = pool.acquire().await?;
    sqlx::query!("CREATE TABLE IF NOT EXISTS unit (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    );").execute(conn).await?;

    // to_unit = from_unit * multiplier
    let conn = pool.acquire().await?;
    sqlx::query!("CREATE TABLE IF NOT EXISTS unit_converter (
        id INTEGER PRIMARY KEY,
        from_id INTEGER,
        to_id INTEGER,
        multiplier REAL NOT NULL
    )").execute(conn).await?;

    let conn = pool.acquire().await?;
    sqlx::query!("CREATE TABLE IF NOT EXISTS past_prices (
        id INTEGER PRIMARY KEY,
        item_id INTEGER,
        price REAL NOT NULL
    )").execute(conn).await?;

    let conn = pool.acquire().await?;
    sqlx::query!("CREATE TABLE IF NOT EXISTS venue (
        id INTEGER PRIMARY KEY,
        name TEXT,
        location TEXT
    )").execute(conn).await?;

    let conn = pool.acquire().await?;
    sqlx::query!("CREATE TABLE IF NOT EXISTS receipt (
        id INTEGER PRIMARY KEY,
        venue_id INTEGER,
        date TEXT
    )").execute(conn).await?;

    let conn = pool.acquire().await?;
    sqlx::query!("CREATE TABLE IF NOT EXISTS receipt_items (
        id INTEGER PRIMARY KEY,
        receipt_id INTEGER,
        item_id INTEGER
    )").execute(conn).await?;

    let conn = pool.acquire().await?;
    sqlx::query!("CREATE TABLE IF NOT EXISTS receipt_items_quantities (
        id INTEGER PRIMARY KEY,
        receipt_items_id INTEGER,
        item_id INTEGER NOT NULL,
        unit_id INTEGER NOT NULL,
        unit_quantity REAL NOT NULL
    )").execute(conn).await?;

    Ok(())
}
