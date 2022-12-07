import {invoke} from "@tauri-apps/api";
import {useState} from "react";
import "./style.scss";

function StoreDropDown ( { currConfig, nameRef, data } ) {
  async function updateButtons() {
    return await invoke("get_arr_stores", { dataMap: currConfig.userData});
  }

  const [renderedButtons, setRenderedButtons] = useState(null);

  let finButtons;
  if (renderedButtons) {
    console.log(data.storeValue.length === 0);
    finButtons = renderedButtons
      .filter((atom) => data.storeValue.length === 0 ||
                        atom.startsWith(data.storeValue))
      .map( (value, index) => {
        return (
          <button onClick={() => {
            data.setStoreValue(index);
            nameRef.current.value = value;
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
    <div className="store-dropdown">
      {finButtons}
    </div>
  )
}

export default StoreDropDown;

