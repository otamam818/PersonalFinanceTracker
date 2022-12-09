import {invoke} from "@tauri-apps/api";
import {useState} from "react";
import "./style.scss";

function StoreDropDown ( { currConfig, data, dateRef } ) {
  async function updateButtons() {
    return await invoke("get_arr_stores", { dataMap: currConfig.userData});
  }

  let [renderedButtons, setRenderedButtons] = useState([]);

  let finButtons;
  if (renderedButtons.length !== 0) {
    finButtons = renderedButtons
      .filter((atom) =>  data.storeValue.length === 0 ||
                        atom.startsWith(data.storeValue))
      .map( (value, index) => {
        return (
          <button key={index} onClick={(e) => {
            e.preventDefault();
            data.setStoreValue(value);
            dateRef.current.focus();
          }}>
            {value}
          </button>
        )})
    if (finButtons.length === 0 && data.storeValue.length !== 0) {
      return (
        <p>Adding new value <strong>{data.storeValue}</strong></p>
      )
    } else {
      data.setFeedbackMessage(null);
    }
  } else {
    updateButtons()
      .then((/* list */) => {
        setRenderedButtons(["Coles", "Woolworths", "Aldis"]);
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

export default StoreDropDown;

