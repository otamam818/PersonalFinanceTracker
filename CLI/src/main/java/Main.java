import com.google.gson.Gson;
import com.google.gson.JsonElement;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.Reader;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World\n");
        try {
            new Record("src/main/resources/sample.json");
            var myScan = new Scanner(System.in);
            String inputChoice = myScan.nextLine();
            while (Utils.isNumericInt(inputChoice)) {
                int userChoice = Integer.parseInt(inputChoice);
                System.out.println(Record.getRecord(userChoice));
                inputChoice = myScan.nextLine();
            }
//            System.out.println(o);
        } catch  (FileNotFoundException e) {
            e.printStackTrace();
        }

    }
}
