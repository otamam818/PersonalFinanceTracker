import {useRef, useState} from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import StoreDropDown from './ReceiptComponents/StoreDropdown';

function ReceiptForm ( { setFormShown, currConfig } ) {
  const [storeValue, setStoreValue] = useState("");
  const descriptionRef = useRef(null);
  const [chosenStore, setChosenStore] = useState(null)

  console.log(currConfig);

  function handleSubmit () {
    /*
    async function updateConfig() {
      return await invoke(
        "append_category",
        {
          dataMap: currConfig.userData,
          name,
          description
        }
      );
    }

    updateConfig()
      .then((data) => {
        currConfig.setConfig({ ...currConfig, userData: data });

        // Clear the ReceiptForm
        nameRef.current.value = "";
        descriptionRef.current.value = "";

        // Close the ReceiptForm
        setFormShown(false);
        // TODO: Give a message that the value has been added
      })
    */
  }

  return (
    <form
      className="form-general form-category"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1> Receipt </h1>
      <label>
        <span>Store</span>
        <input
          type="text"
          onChange={(e) => setStoreValue(e.target.value)}
          list="stores"
          value={storeValue} />
        <StoreDropDown
          currConfig={currConfig}
          data={{storeValue, setStoreValue}}
          setChosenStore={setChosenStore} />
      </label>
      <label>
        <span> Date and Time </span>
        <textarea rows={5} ref={descriptionRef}></textarea>
      </label>
      <label> 
        <span> Subcategories </span>
        <div className="form--box">
        </div>
      </label>

      <div className="button-area">
        <button onClick={() => handleSubmit()}> Submit </button>
        <button onClick={() => setFormShown(false)}> Cancel </button>
      </div>
    </form>
  )
}

export default ReceiptForm;

