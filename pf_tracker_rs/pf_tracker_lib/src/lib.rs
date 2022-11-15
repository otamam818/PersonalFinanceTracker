mod receipt;

// TODO: Add ability to write to toml file

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn date_string() {
        let result = receipt::Date(16, 11, 2022);
        assert!(result.as_str().unwrap().contains("November"));
    }

    #[test]
    fn test_toml() {
        let fin_receipt = receipt::Receipt {
            currency_unit: "AUD".to_string(),
            items: vec![
                receipt::Item {
                    name: "Cheese".to_string(),
                    quantity: 1,
                    total_price: Some(32.0),
                    individual_price: None,
                    category: receipt::Category::Undecided
                },
                receipt::Item {
                    name: "Banana".to_string(),
                    quantity: 1,
                    total_price: Some(3.0),
                    individual_price: None,
                    category: receipt::Category::Food
                }
            ]
        };

        let toml = toml::to_string(&fin_receipt);
        println!("{}", receipt::Date(16, 11, 2022).to_table());
        println!("{}", toml.unwrap());
    }
}
