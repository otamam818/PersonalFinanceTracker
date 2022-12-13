/**
 * @fileoverview The component that lets the user add a new store to the file
 */
import {invoke} from "@tauri-apps/api";
import {useRef} from "react";
import {updateButtons} from "./StoreDropdown";

function AddStore( { currConfig, setters, dateRef } ) {
  const nameRef = useRef(null)
  const locationRef = useRef(null)
  return (
    <div className="add-store"> 
      <div>
        <span>Name:</span>
        <input type="text" ref={nameRef} placeholder="required" />
      </div>
      <div>
        <span>Location:</span>
        <input type="text" ref={locationRef} placeholder="optional" />
      </div>
      <button
        className="form-button"
        onClick={() =>{
          handleSubmit(
            currConfig,
            nameRef.current.value,
            locationRef.current.value,
            setters
          );
          dateRef.current.focus();
          nameRef.current.value = "";
          locationRef.current.value = "";
      }}> Add </button>
    </div>
  )
}

async function handleSubmit(currConfig, name, location, setters) {
  if (name.length === 0) {
    return;
  }

  currConfig.userData
    = await invoke(
      "append_store",
      {
        dataMap: currConfig.userData,
        name,
        location
      });
  currConfig.setConfig(currConfig)
  updateButtons(currConfig.userData).then((list) => {
    setters.setRenderedButtons(list);
    setters.setStoreValue(name);
  });
}

export default AddStore;
