/**
 * @fileoverview The label component inside the ReceiptForm that lets users
 *               flexibly add and select items
 */
import {invoke} from "@tauri-apps/api";
import {useEffect, useState} from "react";
import {CheckSquare, Square} from "react-feather";
import {appendItem} from "../ItemForm";
import ItemInputs from "./ItemInputs";

function ItemLabel( { currConfig } ) {
  const [optionData, setOptions] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [itemSet, setItemSet] = useState(new Set());

  useEffect(() => {
    getArrItems(setOptions, currConfig.userData);
  }, [setOptions, currConfig]);

  const [height, setHeight]
    = useState(120);
  getItemHeight(currConfig).then((value) => {
    setHeight(value);
  })

  return (
    <label className="items">
      <span> Items </span>
      <div className="form--box" style={{height: `${height}px`}}>
        <ItemInputs currConfig={currConfig} />
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
            console.log(nameVal, priceVal, currencyVal);
            if (nameVal.length === 0 || priceVal.length === 0) {
              setFeedbackMessage(<span>Please enter a valid item</span>);
              return;
            }
            setFeedbackMessage(null);

            appendItem(currConfig, nameVal, priceVal, currencyVal)
              .then((value) => {
                console.log(value);
                currConfig.userData = value;
                getArrItems(setOptions, value);
                currConfig.setConfig(currConfig);
              });
          }}
        > Add </button>
        <Options optionData={optionData} itemSet={itemSet} setItemSet={setItemSet} />
      </div>
      {feedbackMessage}
    </label>
  )
}

function Options ( { optionData, itemSet, setItemSet }) {
  console.log(optionData);
  let finRendered = optionData.map((value) => {
    return <TickBox 
      value={value}
      itemSet={itemSet}
      setItemSet={setItemSet}
    />
  });
  return finRendered;
}

function TickBox( { value, itemSet } ) {
  let newestPrice = value.prices[value.prices.length - 1];
  let [priceVal, setPriceVal] = useState(0);
  let hasNoQuantity = priceVal === 0;

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
          if (priceVal > 0) {
            setPriceVal(priceVal-1)
          }
        }}> - </div>
        <div className="number-showcase"> {priceVal} </div>
        <div className="append" onClick={() => {
          setPriceVal(priceVal+1);
        }}> + </div>
      </div>
    </div>
  )
}

async function getArrItems(setter, dataMap) {
  setter(await invoke("get_arr_items", { dataMap }));
}

async function getItemHeight(currConfig) {
  return await invoke("get_item_height", { dataMap: currConfig.userData });
}


export default ItemLabel;
