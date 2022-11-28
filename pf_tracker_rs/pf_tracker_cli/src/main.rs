use pf_tracker_lib::date::Date;
use pf_tracker_lib::receipt::{Receipt, Time};
use toml;

fn main() {
    println!("Hello rust");
}

#[allow(dead_code)]
fn check_receipt() {
    println!("{}", toml::to_string( &vec![
        Receipt {
            date: Date::new(21, 06, 2020).unwrap(),
            time: Time::new(14, 45).unwrap(),
            location_id: 1
        },
        Receipt {
            date: Date::new(21, 8, 2021).unwrap(),
            time: Time::new(08, 00).unwrap(),
            location_id: 3
        }
    ]).unwrap());
}

