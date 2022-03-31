import java.util.ArrayList;

public class Shop {
    private final ArrayList<Item> items = new ArrayList<>();
    public String name;

    public Shop(String name) {
        this.name = name;
    }

    public void addItem(Item item) {
        items.add(item);
    }
}
