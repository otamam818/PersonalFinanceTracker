/**
 * @fileoverview The dropdown component that lets the user control 2 things:
 *               - Adding a new store
 *               - Choosing from an existing store
 */
import {invoke} from "@tauri-apps/api";
import {useState} from "react";
import AddStore from "./AddStore";
import "./style.scss";

/* Used to render an array of an integer. The array was required to be
 * non-empty, as the backend-function can instead return an empty array,
 * thus never updating the component
 */
const INITIAL = -1;

function StoreDropDown ( { currConfig, data, dateRef } ) {
  // An array that gets modified differently based on what kind of data
  // it contains
  let [renderedButtons, setRenderedButtons] = useState([INITIAL]);

  let finButtons;
  // Check if it is in the initial state
  if (!renderedButtons.includes(INITIAL)) { 
    // Set up the adding functionality within the dropdown
    finButtons = [
      <h3 key="heading-1">Add your own</h3>,
      <AddStore
        key="Adder"
        currConfig={currConfig}
        dateRef={dateRef}
        setters={{setRenderedButtons, setStoreValue: data.setStoreValue}}
      />,
    ]
    if (renderedButtons.length !== 0) {
      finButtons = finButtons.concat([
        <hr key="line-break"/>,
        <h3 key="heading-2">Or choose from pre-existing ones</h3>
      ])
    }

    // This part wont render anything if renderedButtons is simply empty
    finButtons = finButtons.concat(
      renderedButtons
      .filter((atom) =>  data.storeValue.length === 0 ||
                        atom.name.startsWith(data.storeValue))
      .map( (value, index) => {
        let location = value.location === null
          ? (<span className="text-unknown">Unknown Location</span>) 
          : (<span className="location"> {value.location} </span>);
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

// Exported as it is also used whenever a new category is added
// (the AddStore component)
export async function updateButtons(dataMap) {
  return await invoke("get_arr_stores", { dataMap});
}

export default StoreDropDown;
