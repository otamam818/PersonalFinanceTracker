use sqlx::{Acquire, SqliteConnection};

use crate::shared::DynamicError;

pub async fn execute(pool: &mut SqliteConnection) -> Result<(), DynamicError> {
    let conn = pool.acquire().await?;
    sqlx::query("CREATE TABLE IF NOT EXISTS venue (
        id INTEGER PRIMARY KEY,
        name TEXT,
        location TEXT
    )").execute(conn).await?;

    let conn = pool.acquire().await?;
    sqlx::query("CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    );").execute(conn).await?;

    let conn = pool.acquire().await?;
    sqlx::query("CREATE TABLE IF NOT EXISTS item (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        category_id INTEGER,
        current_price REAL NOT NULL,
        FOREIGN KEY category_id
            REFERENCES category(id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
    );").execute(conn).await?;

    // Represents an item unit, such as kg, ml, L, per-each, etc.
    let conn = pool.acquire().await?;
    sqlx::query("CREATE TABLE IF NOT EXISTS unit (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    );").execute(conn).await?;

    // to_unit = from_unit * multiplier
    let conn = pool.acquire().await?;
    sqlx::query("CREATE TABLE IF NOT EXISTS unit_converter (
        id INTEGER PRIMARY KEY,
        from_id INTEGER,
        to_id INTEGER,
        multiplier REAL NOT NULL,
        FOREIGN KEY from_id
            REFERENCES unit(id)
                ON UPDATE CASCADE
                ON DELETE CASCADE,
        FOREIGN KEY to_id
            REFERENCES unit(id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
    )").execute(conn).await?;

    let conn = pool.acquire().await?;
    sqlx::query("CREATE TABLE IF NOT EXISTS past_prices (
        id INTEGER PRIMARY KEY,
        item_id INTEGER,
        price REAL NOT NULL,
        FOREIGN KEY item_id
            REFERENCES item(id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
    )").execute(conn).await?;

    // TODO: Make location become a separate table called `branches` since a
    // venue can have multiple branches

    let conn = pool.acquire().await?;
    sqlx::query("CREATE TABLE IF NOT EXISTS receipt (
        id INTEGER PRIMARY KEY,
        venue_id INTEGER,
        date TEXT,
        FOREIGN KEY venue_id
            REFERENCES venue(id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
    )").execute(conn).await?;

    let conn = pool.acquire().await?;
    sqlx::query("CREATE TABLE IF NOT EXISTS receipt_items (
        id INTEGER PRIMARY KEY,
        receipt_id INTEGER NOT NULL,
        item_id INTEGER NOT NULL,
        unit_id INTERGER NOT NULL,
        -- how many did the user buy at this time
        quantity INTEGER NOT NULL,

        FOREIGN KEY receipt_id
            REFERENCES receipt(id)
                ON UPDATE CASCADE
                ON DELETE CASCADE,
 
        FOREIGN KEY item_id
            REFERENCES item(id)
                ON UPDATE CASCADE
                ON DELETE CASCADE,

        FOREIGN KEY unit_id
            REFERENCES unit(id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
    )").execute(conn).await?;

    // Id reccomend removing this, it doesn't seem to do anything
    // the receipt_items table can't (not included in ERD)
    let conn = pool.acquire().await?;
    sqlx::query("CREATE TABLE IF NOT EXISTS receipt_items_quantities (
        id INTEGER PRIMARY KEY,
        receipt_items_id INTEGER,
        item_id INTEGER NOT NULL,
        unit_id INTEGER NOT NULL,
        unit_quantity REAL NOT NULL
    )").execute(conn).await?;

    Ok(())
}
