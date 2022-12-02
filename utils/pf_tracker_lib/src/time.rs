use serde_derive::{Deserialize, Serialize};
use std::fmt::Display;

#[derive(Debug, PartialEq, Serialize, Deserialize, Clone)]
pub struct Time (u8, u8);

impl Time {
    #[allow(dead_code)]
    pub fn new(hours: u8, minutes: u8) -> Result<Time, &'static str> {
        if hours > 23 {
            return Err("Hours exceeded");
        }

        if minutes > 59 {
            return Err("Minutes exceeded");
        }

        Ok(Time(hours, minutes))
    }

    pub fn hours(&self) -> u8 {
        self.0
    }

    pub fn minutes(&self) -> u8 {
        self.1
    }
}

impl Display for Time {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}:{}", self.hours(), self.minutes())
    }
}

