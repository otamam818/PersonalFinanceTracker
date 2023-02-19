import ItemInputs from "./ItemInputs";

function ItemAdder ( { setOptions, setFeedbackMessage, dispatch }) {
  return (
    <>
    <ItemInputs />
    <button className="form-button"
      onClick={() => {
        let [nameVal, priceVal, currencyVal]
          = [".name input", ".price input", ".price-label select"]
          .map(value => document.querySelector(`.item-box ${value}`).value);

        if (nameVal.length === 0 || priceVal.length === 0) {
          setFeedbackMessage(<span>Please enter a valid item</span>);
          return;
        }
        setFeedbackMessage(null);

        appendItem(userData, nameVal, priceVal, currencyVal)
          .then((value) => {
            dispatch(setUserData(value));
            getArrItems(setOptions, value);
          });
      }}
    > Add </button>
    </>
  );
}

export default ItemAdder;
