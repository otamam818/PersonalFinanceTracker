use serde_derive::{Deserialize, Serialize};
use std::{fmt::Display, collections::HashSet};
use chrono::{self, Datelike};

// In the format DD/MM/YYYY
#[derive(Debug, PartialEq, Serialize, Deserialize, Clone)]
pub struct Date (u8, u8, u32);

impl Date {
    #[allow(dead_code)]
    pub fn new(day: u8, month: u8, year: u32) -> Result<Date, &'static str> {
        const INVALID_MESSAGE: &'static str
            = "Invalid date, please enter a date in a valid range";

        // For dates that don't have a 31st in it
        let normals = HashSet::<u8>::from([4, 6, 9, 11]);
        // For dates that have a 31st in it
        let plus_ones = HashSet::<u8>::from([1, 3, 5, 7, 8, 10, 12]);

        let candidate = Date (day, month, year);
        if normals.contains(&month) && day >= 31  ||
           plus_ones.contains(&month) && day > 31 ||

           // February is a special case
           month == 2 && day > 28 || 
           over_present(&candidate)
           
        {
            return Err(INVALID_MESSAGE);
        }

        Ok(candidate)
    }

    pub fn year(&self) -> u32 {
        self.2
    }

    pub fn month(&self) -> u8 {
        self.1
    }
    pub fn day(&self) -> u8 {
        self.0
    }
}

fn over_present(given_date: &Date) -> bool {
    let curr_time = chrono::offset::Local::now();

    dbg!(curr_time.year());

    if curr_time.year()  > given_date.year() as i32  ||
       curr_time.month() > given_date.month() as u32 ||
       curr_time.day()   > given_date.day() as u32 {
        return false;
    }

    true
}

impl Display for Date {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}/{}/{}", self.0, self.1, self.2)
    }
}

#[cfg(test)]
mod tests {
    use crate::date::Date;

    #[test]
    fn test_valid_date() {
        let valid = Date::new(11, 06, 2000);
        match valid {
            Ok(_) => assert!(true),
            Err(_) => assert!(false)
        };
    }
}
