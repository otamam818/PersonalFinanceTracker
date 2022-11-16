use serde_derive::Serialize;

// In the format DD/MM/YYYY
#[derive(Debug, PartialEq, Serialize)]
pub struct Date (pub u8, pub u8, pub u32);

impl Date {
    #[allow(dead_code)]
    pub fn as_str(&self) -> Result<String, String> {
        let month = match self.1 {
            01 => "January",
            02 => "February",
            03 => "March",
            04 => "April",
            05 => "May",
            06 => "June",
            07 => "July",
            08 => "August",
            09 => "September",
            10 => "October",
            11 => "November",
            12 => "December",
            _ => ""
        };
        if month.len() == 0 {
            return Err(String::from("Invalid Month"));
        }
        let mut finstr = String::from("Hello ");
        finstr.push_str(self.0.to_string().as_ref());
        finstr.push_str(" ");
        finstr.push_str(month.as_ref());
        finstr.push_str(", ");
        finstr.push_str(self.2.to_string().as_ref());
        Ok(finstr)
    }

    pub fn to_table(&self) -> String {
        format!("[{}.{}.{}]", self.2, self.1, self.0)
    }
}

#[derive(Debug, Serialize, Clone)]
#[allow(dead_code)]
pub enum Category {
    Undecided,
    Food,
    Restaurant,
    Sports,
    BoardGames,
    VideoGames,
    Bets,
    Investments,
    ExternalEducation,
    Travel
}

#[derive(Debug, Serialize, Clone)]
pub struct Item {
    pub name: String,
    pub quantity: u32,
    pub individual_price: Option<f32>,
    pub category: Category
}

#[derive(Debug, Serialize, Clone)]
pub struct Receipt {
    pub currency_unit: String,
    pub store: String,
    pub items: Vec<Item>,
}

#[allow(dead_code)]
pub struct DatedReceipt {
    pub date: Date,
    pub receipt: Receipt
}

