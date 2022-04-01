import com.google.gson.JsonObject;

import java.util.ArrayList;

public class Item {
    public String Name, type, category;
    public int quantity;
    public Double totalPrice;

    private Item (JsonObject currentShop) {
        this.Name       = currentShop.get("Item").getAsString();
        this.type       = currentShop.get("Type").getAsString();
        this.category   = currentShop.get("Category").getAsString();
        this.quantity   = currentShop.get("Quantity").getAsInt();
        this.totalPrice = currentShop.get("Total Price").getAsDouble();
    }

    public static ArrayList<Item> getItemList (JsonObject record) {
        var ItemData = record.getAsJsonArray("Items");
        var ItemList = new ArrayList<Item>();

        for (int i = 0; i < ItemData.size(); i++) {
            JsonObject thisItemData = ItemData.get(i).getAsJsonObject();
            Item currentItem = new Item(thisItemData);
        }
        return ItemList;
    }

    @Override
    public String toString() {
        return "Item{" +
                "Name='" + Name + '\'' +
                ", type='" + type + '\'' +
                ", category='" + category + '\'' +
                ", quantity=" + quantity +
                ", totalPrice=" + totalPrice +
                '}';
    }
}
