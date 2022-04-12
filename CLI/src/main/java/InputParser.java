import javax.print.DocFlavor;
import java.util.ArrayList;

public class InputParser {
    private static final ArrayList<Integer> stateTracker = new ArrayList<>();

    public static void changeState(int input) {
        stateTracker.add(input);
    }

    public static void changeState(String input) {
        // -b -> go backwards
        if (input.equals("-b")) {
            stateTracker.remove(-1);
        }
    }

    public static void changeState(Object[] inputs) {
        // -c -> change value
        int counter = 0;

        if (inputs[counter] instanceof String thisInput) {
            String CHANGE_COMMAND = "-c";
            boolean isChangeCommand = thisInput.equals(CHANGE_COMMAND);
            if (isChangeCommand) {

            }

        }
    }
}
