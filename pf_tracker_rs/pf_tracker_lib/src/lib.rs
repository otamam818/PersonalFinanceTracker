pub mod receipt;
pub mod date;
pub mod time;

pub use crate::receipt::Receipt;
pub use crate::date::Date;
pub use crate::time::Time;

#[cfg(test)]
mod tests {
    #[test]
    fn test_something() {
    }
}
