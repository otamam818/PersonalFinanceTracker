pub mod item;
pub mod receipt;

#[derive(Debug)]
pub enum ErrorMessage {
    /// Denotes that all fields in the inserter were not covered
    NonExhaustiveFields,
    /*
    /// Denotes that these exact fields exist in the database
    NonUnique
     */
}