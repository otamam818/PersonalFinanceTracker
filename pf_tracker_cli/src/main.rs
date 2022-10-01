pub mod receipt;
use crate::receipt::Date;

fn main() {
    let date = Date(29, 02, 2020);
    println!("{}", date.as_str());
}
