import {invoke} from "@tauri-apps/api";
import {useState} from "react";
import "./style.scss";

function StoreDropDown ( { currConfig, data, visibility, dateRef } ) {
  async function updateButtons() {
    return await invoke("get_arr_stores", { dataMap: currConfig.userData});
  }

  const [renderedButtons, setRenderedButtons] = useState(null);

  let finButtons;
  if (renderedButtons) {
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
  } else {
    updateButtons()
      .then((/* list */) => {
        setRenderedButtons(["Coles", "Woolworths", "Aldis"]);
      })
  }
  return (
    <div
      className={"store-dropdown" + ((visibility.isVisible)
        ? " shown"
        : " hidden"
    )}>
      {finButtons}
    </div>
  )
}

export default StoreDropDown;

