import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Utils {
    public static String readFile(String filePath) throws FileNotFoundException {
        String finString = "";
        File myFile = new File(filePath);
        Scanner myScan = new Scanner(myFile);
        while (myScan.hasNext()) finString += myScan.nextLine() + "\n";
        return finString;
    }

    public static boolean isNumericInt(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch(NumberFormatException e){
            return false;
        }
    }
}
