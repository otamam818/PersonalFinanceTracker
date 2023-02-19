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
import { clearOverlay, setShouldRefresh } from '../../stateController/dashboard';

function ReceiptForm () {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.data);
  const overlayData = useSelector(state => state.dashboard.overlayData);
  return (
    <form
      className="form-general form-receipt"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1> Receipt </h1>
      <StoreLabel />
      <DateTimeLabel />

      <ItemLabel />

      <div className="button-area">
        <button className="options--button"
          onClick={() => handleSubmit(
            userData,
            clearOverlay,
            dispatch,
            overlayData
        )}>
          Submit
        </button>
        <button className="options--button"
          onClick={() => dispatch(clearOverlay())}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

async function handleSubmit(userData, clearOverlay, dispatch, overlayData) {
  let storeId = document.querySelector("input[for='store-name']").value;
  let date = getFromInputIDs(['date-day', 'date-month', 'date-year']);
  let time = getFromInputIDs(['time-hour', 'time-minute']);

  let items = getCheckedItems();
  let params, rust_func;
  if (overlayData) {
    let { receiptKey } = overlayData;
    rust_func = "update_receipt";
    params = { dataMap: userData, storeId, date, time, items, receiptKey }
  } else {
    rust_func = "append_receipt";
    params = { dataMap: userData, storeId, date, time, items }
  }
  let newUserData = await invoke(rust_func, params);

  dispatch(setUserData(newUserData));
  dispatch(setShouldRefresh(true));
  dispatch(clearOverlay());
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

