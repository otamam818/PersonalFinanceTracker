/**
 * @fileoverview Manages the whole Receipt form and its sub-components
 * @author Tahmin Ahmed (www.github.com/otamam818)
 */
import StoreLabel from './ReceiptComponents/StoreLabel';
import DateTimeLabel from './ReceiptComponents/DateTimeLabel';
import ItemLabel from './ReceiptComponents/ItemLabel';
import {invoke} from '@tauri-apps/api';

function ReceiptForm ( { formIsShown, currConfig } ) {
  return (
    <form
      className="form-general form-category"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1> Receipt </h1>
      <StoreLabel
        currConfig={currConfig} />
      <DateTimeLabel />

      <ItemLabel currConfig={currConfig} />

      <div className="button-area">
        <button onClick={() => handleSubmit(currConfig, formIsShown)}> Submit </button>
        <button onClick={() => formIsShown.set(false)}> Cancel </button>
      </div>
    </form>
  )
}

async function handleSubmit(currConfig, formIsShown) {
  let storeId = document.querySelector("input[for='store-name']").value;
  let date = getFromInputIDs(['date-day', 'date-month', 'date-year']);
  let time = getFromInputIDs(['time-hour', 'time-minute']);

  let items = getCheckedItems();
  let newUserData = await invoke("append_receipt", {
    dataMap: currConfig.userData,
    storeId,
    date,
    time,
    items
  });
  console.log({newUserData});

  document.querySelectorAll("#check-box--quantity[data-chosen=true]")
  .forEach((element) => element.innerHTML = 0);

  formIsShown.set(false);

  currConfig.setComponent("loadFile");
}

function getFromInputIDs(array) {
  return array.map(value => {
    return parseInt(document.querySelector(`input[id='${value}']`).value)
  });
}

function getCheckedItems() {
  let itemIDs = getNumberfromHTML(".check-box span[hidden][data-chosen=true]");
  let itemQuantities = getNumberfromHTML("#check-box--quantity[data-chosen=true]");

  let finArray = [];
  for (let i = 0; i < itemIDs.length; i++) {
    finArray.push([itemIDs[i], itemQuantities[i]])
  }

  return finArray;
}

function getNumberfromHTML (selector) {
  return Array.from(
    document.querySelectorAll(selector)
  ).map(element => {
    return parseInt(element.innerHTML);
  });
}

export default ReceiptForm;

