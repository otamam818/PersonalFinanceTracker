public class Item {
    public String Name, type, category;
    public int quantity;
    public Double totalPrice;
    public Item (String Name, int quantity, Double totalPrice, String type, String category) {
        this.Name = Name;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.type = type;
        this.category = category;
    }
}
