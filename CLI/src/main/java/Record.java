import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.util.ArrayList;

public class Record {
    public int date;
    public String currency;
    public ArrayList<Shop> ShopsList;

    public Record (int date) {
        this.date = date;
    }

    private Record (JsonObject element) {
        this.date = element.get("Date").getAsInt();
        this.currency = element.get("Currency").getAsString();
    }
}
