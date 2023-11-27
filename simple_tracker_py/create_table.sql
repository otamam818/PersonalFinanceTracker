CREATE TABLE IF NOT EXISTS item (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  current_price REAL NOT NULL
);

-- Represents an item unit, such as kg, ml, L, per-each, etc.
CREATE TABLE IF NOT EXISTS unit (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  current_price REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS item_unit (
  id INTEGER PRIMARY KEY,
  item_id INTEGER NOT NULL,
  unit_id INTEGER NOT NULL,
  unit_quantity REAL NOT NULL
);

-- to_unit = from_unit * multiplier
CREATE TABLE IF NOT EXISTS unit_converter (
  id INTEGER PRIMARY KEY,
  from_id INTEGER,
  to_id INTEGER,
  multiplier REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS past_prices (
  id INTEGER PRIMARY KEY,
  item_id INTEGER,
  price REAL NOT NULL
);

