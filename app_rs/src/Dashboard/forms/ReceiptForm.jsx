/**
 * @fileoverview Manages the whole Receipt form and its sub-components
 * @author Tahmin Ahmed (www.github.com/otamam818)
 */
import StoreLabel from './ReceiptComponents/StoreLabel';
import DateTimeLabel from './ReceiptComponents/DateTimeLabel';
import ItemLabel from './ReceiptComponents/ItemLabel';
import {invoke} from '@tauri-apps/api';
import { setUserData } from '../../stateController/userData';
import { useSelector, useDispatch } from 'react-redux';

function ReceiptForm ( { formIsShown } ) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.data);
  return (
    <form
      className="form-general form-category"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1> Receipt </h1>
      <StoreLabel />
      <DateTimeLabel />

      <ItemLabel />

      <div className="button-area">
        <button onClick={() => handleSubmit(userData, formIsShown, dispatch)}> Submit </button>
        <button onClick={() => formIsShown.set(false)}> Cancel </button>
      </div>
    </form>
  )
}

async function handleSubmit(userData, formIsShown, dispatch) {
  let storeId = document.querySelector("input[for='store-name']").value;
  let date = getFromInputIDs(['date-day', 'date-month', 'date-year']);
  let time = getFromInputIDs(['time-hour', 'time-minute']);

  let items = getCheckedItems();
  let newUserData = await invoke("append_receipt", {
    dataMap: userData,
    storeId,
    date,
    time,
    items
  });
  console.log({newUserData});

  document.querySelectorAll("#check-box--quantity[data-chosen=true]")
  .forEach((element) => element.innerHTML = 0);

  formIsShown.set(false);
  // dispatch(setUserData(newUserData));
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

