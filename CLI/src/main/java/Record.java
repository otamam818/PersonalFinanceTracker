import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.io.FileNotFoundException;
import java.util.ArrayList;

public class Record {
    public static ArrayList<Record> allRecords = new ArrayList<>();
    private int date;
    private String currency;
    private ArrayList<Shop> ShopsList;

    public static Record getRecord(int recordIndex) {
        return allRecords.get(recordIndex);
    }

    private Record (JsonObject element) {
        this.date = element.get("Date").getAsInt();
        this.currency = element.get("Currency").getAsString();
        this.ShopsList = Shop.getShoppingList(element);
    }

    public Record (String filePath) throws FileNotFoundException {
        String data = Utils.readFile(filePath);
        Gson gson = new Gson();
        JsonObject mainData = gson.fromJson(data, JsonObject.class);
        JsonArray recordsArray = mainData.getAsJsonArray("Dates");

        for (int i = 0; i < recordsArray.size(); i++) {
            JsonObject element = recordsArray.get(i).getAsJsonObject();
            Record newRecord = new Record(element);
            allRecords.add(newRecord);
        }

    }

    @Override
    public String toString() {
        return "Record{" +
                "date=" + date +
                ", currency='" + currency + '\'' +
                ", ShopsList=" + ShopsList +
                '}';
    }
}
