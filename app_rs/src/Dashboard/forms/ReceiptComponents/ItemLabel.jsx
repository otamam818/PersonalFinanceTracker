/**
 * @fileoverview The label component inside the ReceiptForm that lets users
 *               flexibly add and select items
 */
import {invoke} from "@tauri-apps/api";
import {useEffect, useState} from "react";
import {CheckSquare, Square} from "react-feather";
import {appendItem} from "../ItemForm";
import ItemInputs from "./ItemInputs";
import { setUserData } from '../../../stateController/userData';
import { useSelector, useDispatch } from 'react-redux';

function ItemLabel() {
  const [optionData, setOptions] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.data);

  useEffect(() => {
    getArrItems(setOptions, userData);
  }, [setOptions]);

  const [height, setHeight]
    = useState(120);
  getItemHeight(userData).then((value) => {
    setHeight(value);
  })

  return (
    <label className="items">
      <span> Items </span>
      <div className="form--box" style={{height: `${height}px`}}>
        <ItemInputs />
        <button className="form-button"
          onClick={() => {
            let nameVal = document
              .querySelector(".item-box .name input")
              .value;
            let priceVal = document
              .querySelector(".item-box .price input")
              .value;
            let currencyVal = document
              .querySelector(".item-box .price-label select")
              .value;
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
        <Options optionData={optionData} />
      </div>
      {feedbackMessage}
    </label>
  )
}

function Options ( { optionData }) {
  return optionData.map((value, index) =>
    <TickBox
      key={index}
      value={value}
    />);
}

function TickBox( { value } ) {
  const overlayData = useSelector(state => state.dashboard.overlayData);
  let [quantity, setQuantity]
    = useState(overlayData?.items[value.id] ? overlayData.items[value.id] : 0);

  let newestPrice = value.prices[value.prices.length - 1];
  let hasNoQuantity = quantity === 0;
  let chosenIcon = !hasNoQuantity ? <CheckSquare /> : <Square />

  return (
    <div
      className="check-box"
      data-selected={!hasNoQuantity}
    >
      {chosenIcon}
      <span>{value.name}({newestPrice}){value.currency}</span>
      <span className="item-id" data-chosen={!hasNoQuantity} hidden >{value.id}</span>
      <div className="quantity-modifier">
        <div className="prepend" onClick={() => {
          if (quantity > 0) {
            setQuantity(quantity-1)
          }
        }}> - </div>

        <div
          id="check-box--quantity"
          className="number-showcase"
          data-chosen={!hasNoQuantity}
        >
          {quantity}
        </div>

        <div className="append" onClick={() => {
          setQuantity(quantity+1);
        }}> + </div>
      </div>
    </div>
  )
}

async function getArrItems(setter, dataMap) {
  setter(await invoke("get_arr_items", { dataMap }));
}

async function getItemHeight(userData) {
  return await invoke("get_item_height", { dataMap: userData });
}

export default ItemLabel;
