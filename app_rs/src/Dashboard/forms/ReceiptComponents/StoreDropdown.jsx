import {invoke} from "@tauri-apps/api";
import {useState} from "react";
import AddStore from "./AddStore";
import "./style.scss";

const INITIAL = -1;

function StoreDropDown ( { currConfig, data, dateRef } ) {
  let [renderedButtons, setRenderedButtons] = useState([INITIAL]);

  let finButtons;
  if (!renderedButtons.includes(-1)) {
    finButtons = [
      <h3 key="heading-1">Add your own</h3>,
      <AddStore
        key="Adder"
        currConfig={currConfig}
        dateRef={dateRef}
        setters={{setRenderedButtons, setStoreValue: data.setStoreValue}}
      />,
      <hr key="line-break"/>,
      <h3 key="heading-2">Or choose from pre-existing ones</h3>
    ]
    finButtons = finButtons.concat(
      renderedButtons
      .filter((atom) =>  data.storeValue.length === 0 ||
                        atom.name.startsWith(data.storeValue))
      .map( (value, index) => {
        let location = value.location === null
          ? (<span className="text-unknown">Unknown Location</span>) 
          : (<span> {value.location} </span>);
        return (
          <button key={index} onClick={(e) => {
            e.preventDefault();
            data.setStoreValue(value.name);
            dateRef.current.focus();
          }}>
            {value.name}
            {location}
          </button>
        )})
    )
    if (finButtons.length === 0 && data.storeValue.length !== 0) {
      return (
        <p>Adding new value <strong>{data.storeValue}</strong></p>
      )
    } else {
      data.setFeedbackMessage(null);
    }
  } else {
    updateButtons(currConfig.userData)
      .then((list) => {
        console.log(list);
        setRenderedButtons(list);
      })
  }
  
  return (
    <div
      className={"store-dropdown" + ((data.isVisible)
        ? " shown"
        : " hidden"
    )}>
      {finButtons}
    </div>
  )
}

export async function updateButtons(dataMap) {
  return await invoke("get_arr_stores", { dataMap});
}

export default StoreDropDown;

