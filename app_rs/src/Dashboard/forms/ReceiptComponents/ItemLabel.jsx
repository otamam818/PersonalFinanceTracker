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
    getArrItems(setOptions, currConfig.userData)
      .then((arrValue) => {
        console.log(arrValue);
      });
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

function TickBox( { value, itemSet, setItemSet } ) {
  let newestPrice = value.prices[value.prices.length - 1];
  let [chosenIcon, setChosenIcon] = useState(
    itemSet.has(value.id) ? <CheckSquare /> : <Square />
  );
  return (
    <div className="check-box" data-selected={itemSet.has(value.id)} onClick={(e) => {
      e.preventDefault();
      if (itemSet.has(value.id)) {
        itemSet.delete(value.id);
        setChosenIcon(<Square />);
      } else {
        itemSet.add(value.id);
        setChosenIcon(<CheckSquare />);
      }
      console.log(itemSet)
      setItemSet(itemSet);
    }}>
      {chosenIcon}
      <span>{value.name}({newestPrice}){value.currency}</span>
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
