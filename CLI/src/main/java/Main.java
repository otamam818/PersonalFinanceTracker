import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World\n");
        File file = new File(args[0]);
        int numRecords = handleRecord(file);
        System.out.println(numRecords);
        extractText();
    }

    private static int handleRecord(File file) {
        try {
            new Record(file);
        } catch  (FileNotFoundException e) {
            e.printStackTrace();
        }

        return Record.getNumRecords();
    }

    private static void extractText() {
        var myScan = new Scanner(System.in);
        String inputChoice = myScan.nextLine();
        while (Utils.isNumericInt(inputChoice)) {
            int userChoice = Integer.parseInt(inputChoice);
            System.out.println(Record.getRecord(userChoice));
            inputChoice = myScan.nextLine();
        }
        if (!Utils.isNumericInt(inputChoice)) {
            System.out.println("Bye World\n");
        }
    }
}
