// In the format DD/MM/YYYY
pub struct Date (pub u8, pub u8, pub u32);

impl Date {
    pub fn as_str(&self) -> String {
        let month = match self.1 {
            02 => "February",
            06 => "June",
            _ => "Unknown"
        };
        let mut finstr = String::from("Hello ");
        finstr.push_str(self.0.to_string().as_ref());
        finstr.push_str(" ");
        finstr.push_str(month.as_ref());
        finstr.push_str(", ");
        finstr.push_str(self.2.to_string().as_ref());
        finstr
    }
}

/* TODO: Complete this section
enum Category {
    Food
}

struct Item {
    name: String,
    quantity: u32,
    total_price: Option<f32>,
    individual_price: Option<f32>,
    category: Option<Category>
}

struct Receipt {
    date: Date,
    currency_unit: String,
    items: Vec<Item>
}
*/

