/**
 * @fileoverview The label component inside the ReceiptForm that lets users
 *               flexibly add and select items
 */
import {invoke} from "@tauri-apps/api";
import {useEffect, useState} from "react";
import {CornerDownLeft, MoreHorizontal, Trash2} from "react-feather";
import {appendItem} from "../ItemForm";
import ItemInputs from "./ItemInputs";
import { setUserData } from '../../../stateController/userData';
import { useSelector, useDispatch } from 'react-redux';
import {makeState} from "../../../utils";

function ItemLabel() {
  const [optionData, setOptions] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.data);
  const currMode = makeState("+");

  useEffect(() => {
    getArrItems(setOptions, userData);
  }, [setOptions]);

  const [height, setHeight]
    = useState(120);
  getItemHeight(userData).then((value) => {
    setHeight(value);
  })

  const chosenMode = currMode.get === '+'
    ? <Options optionData={optionData} />
    : <ItemAdder
        dispatch={dispatch}
        setOptions={setOptions}
        setFeedbackMessage={setFeedbackMessage}
      />;

  return (
    <label className="items">
      <div onClick={e => e.stopPropagation()} className="spread">
        <span> Items </span>
        <ItemMode currMode={currMode}/>
      </div>
      <div className="form--box" style={{height: `${height}px`}}>
        {chosenMode}
      </div>
      {feedbackMessage}
    </label>
  )
}

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

function ItemMode( { currMode } ) {
  const valMap = {
    '+' : '-',
    '-' : '+'
  };

  return (
    <div
      onClick={() => {
        currMode.set(valMap[currMode.get]);
      }}
      className="options--button"
    >
      {currMode.get}
    </div>
  );
}

function Options ( { optionData }) {
  console.log({optionData});
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

  let hasNoQuantity = quantity === 0;
  let newestPrice = value.prices[value.prices.length - 1];

  return (
    <div
      className="check-box"
      data-selected={!hasNoQuantity}
    >
      <TickBoxEdit />
      <span>{value.name}({newestPrice}){value.currency}</span>
      <span className="item-id" data-chosen={!hasNoQuantity} hidden >{value.id}</span>
      <div className="quantity-modifier">
        <div className="options--button prepend" onClick={() => {
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

        <div className="options--button append" onClick={() => {
          setQuantity(quantity+1);
        }}> + </div>
      </div>
    </div>
  )
}

function TickBoxEdit () {
  const currColor = makeState("grey");
  const isClicked = makeState(false);
  // TODO: Implement the delete function
  let currComponent = isClicked.get
    ? (
      <div className="spread" >
        <CornerDownLeft color="grey" onClick={() => isClicked.set(false)} />
        <Trash2 color="grey" />
      </div>
    )
    : <MoreHorizontal
      onClick={() => isClicked.set(true)}
      className="more-button"
      color={currColor.get}
      onMouseEnter={() => currColor.set("white")}
      onMouseLeave={() => currColor.set("grey")}
    />
  return currComponent;
}

async function getArrItems(setter, dataMap) {
  setter(await invoke("get_arr_items", { dataMap }));
}

async function getItemHeight(userData) {
  return await invoke("get_item_height", { dataMap: userData });
}

export default ItemLabel;
