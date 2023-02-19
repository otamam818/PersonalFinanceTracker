/**
 * @fileoverview The label component inside the ReceiptForm that lets users
 *               flexibly add and select items
 */
import {invoke} from "@tauri-apps/api";
import {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {makeState} from "../../../utils";
import ItemAdder from "./ItemLabel/ItemAdder";
import ItemMode from "./ItemLabel/ItemMode";
import Options from "./ItemLabel/Options";

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

async function getArrItems(setter, dataMap) {
  setter(await invoke("get_arr_items", { dataMap }));
}

async function getItemHeight(userData) {
  return await invoke("get_item_height", { dataMap: userData });
}

export default ItemLabel;
