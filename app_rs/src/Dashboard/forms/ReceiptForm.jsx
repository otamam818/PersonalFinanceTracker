/**
 * @fileoverview Manages the whole Receipt form and its sub-components
 * @author Tahmin Ahmed (www.github.com/otamam818)
 */
import {useRef} from 'react';
import StoreLabel from './ReceiptComponents/StoreLabel';
import DateTimeLabel from './ReceiptComponents/DateTimeLabel';
import ItemLabel from './ReceiptComponents/ItemLabel';
import {invoke} from '@tauri-apps/api';
import { makeState } from '../../utils';

const receiptStates = {
  initial : "INITIAL"
}

function ReceiptForm ( { setFormShown, currConfig } ) {
  const dateRef = useRef(null);
  const receiptState = makeState(receiptStates.initial);
  return (
    <form
      className="form-general form-category"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1> Receipt </h1>
      <StoreLabel
        dateRef={dateRef}
        currConfig={currConfig} />
      <DateTimeLabel dateRef={dateRef} />

      <ItemLabel currConfig={currConfig} />

      <div className="button-area">
        <button onClick={() => handleSubmit(currConfig)}> Submit </button>
        <button onClick={() => setFormShown(false)}> Cancel </button>
      </div>
    </form>
  )
}

async function handleSubmit(currConfig) {
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

