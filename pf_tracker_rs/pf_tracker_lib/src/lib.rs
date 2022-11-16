mod receipt;

// TODO: Add ability to write to toml file
pub fn export_toml(data: Vec<receipt::DatedReceipt>) -> String {
    data
        .iter()
        .map(|atom: &receipt::DatedReceipt| -> String {
            format!("{}\n{}", atom.date.to_table(), toml::to_string(&atom.receipt).unwrap())
        })
        .collect::<String>()
}

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
            store: "Coles".to_string(),
            items: vec![
                receipt::Item {
                    name: "Cheese".to_string(),
                    quantity: 1,
                    individual_price: Some(32.0),
                    category: receipt::Category::Undecided
                },
                receipt::Item {
                    name: "Banana".to_string(),
                    quantity: 1,
                    individual_price: Some(32.0),
                    category: receipt::Category::Food
                }
            ]
        };

        let all_data = vec![receipt::DatedReceipt {
            date: receipt::Date(31, 2, 2022),
            receipt: fin_receipt.clone()
        }];

        println!("{}\n---------", export_toml(all_data));

        let toml = toml::to_string(&fin_receipt);
        println!("{}", receipt::Date(16, 11, 2022).to_table());
        println!("{}", toml.unwrap());
    }
}
