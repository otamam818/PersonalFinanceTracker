import java.util.ArrayList;

public class InputParser {
    private static final ArrayList<Integer> stateTracker = new ArrayList<>();

    public static void changeState(int input) {
        stateTracker.add(input);
    }

    public static void changeState(String input) {
        String BACKWARDS_COMMAND = "-b";
        if (input.equals(BACKWARDS_COMMAND)) {
            stateTracker.remove(-1);
        }
    }

    public static void changeState(String[] inputs) {
        // -c -> change value
        for (int counter = 0; counter < inputs.length; counter++) {
            parseIndex(inputs, counter);
        }
    }

    /**
     * Parses each inputs[counter] String to make a final decision to the
     * stateTracker variable
     * @param inputs the set of commands input in the TUI
     * @param counter the index of the input
     */
    private static void parseIndex(String [] inputs, int counter) {
        String CHANGE_COMMAND = "-c";
        String thisInput = inputs[counter];

        if (thisInput.equals(CHANGE_COMMAND)) {
            // We need to assert that we don't change the base record
            assert stateTracker.size() > 2;
            // {"-c", "Currency", "BDT"}
            int recordIndex = Integer.parseInt(inputs[counter +1]);
            String recordValue = inputs[counter +2];
            for (int i = 0; i < stateTracker.size(); i++) {
                // follow through the state tracker so that it
                // reaches the current state
                switch (i) {
                    case 0 : Record currRecord = Record.getRecord(stateTracker.get(i));
                    case 1 :
                    default:
                }
            }
        }
    }
}
