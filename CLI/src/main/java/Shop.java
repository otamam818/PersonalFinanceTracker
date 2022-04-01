import com.google.gson.JsonObject;

import java.util.ArrayList;

public class Shop {
    public String name;
    public float GST;
    public ArrayList<Item> items = new ArrayList<>();

    public Shop(String name) {
        this.name = name;
    }

    private Shop (JsonObject currentShop) {
        this.name = currentShop.get("Name").getAsString();
        this.GST = currentShop.get("GST").getAsFloat();
        this.items = Item.getItemList(currentShop);
    }

    public static ArrayList<Shop> getShoppingList (JsonObject record) {
        var shoppingData = record.getAsJsonArray("Shops");
        var shoppingList = new ArrayList<Shop>();

        for (int i = 0; i < shoppingData.size(); i++) {
            JsonObject thisShopData = shoppingData.get(i).getAsJsonObject();
            Shop currentShop = new Shop(thisShopData);
        }
        return shoppingList;
    }

    @Override
    public String toString() {
        return "Shop{" +
                "name='" + name + '\'' +
                ", GST=" + GST +
                '}';
    }
}
