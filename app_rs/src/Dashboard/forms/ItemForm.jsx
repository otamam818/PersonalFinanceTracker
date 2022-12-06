import {useRef, useState} from 'react';
import { invoke } from '@tauri-apps/api/tauri';

function ItemForm ( { setFormShown, currConfig } ) {
  const nameRef = useRef(null);
  const [priceState, setPrice] = useState("")
  const currencyRef = useRef(null);

  function handleSubmit () {
    let name = nameRef.current.value;
    let price = priceState;
    let currency = currencyRef.current.value;
    console.log(currConfig);

    async function updateConfig() {
      return await invoke(
        "append_item",
        {
          dataMap: currConfig.userData,
          name,
          price,
          currency
        }
      );
    }

    updateConfig()
      .then((data) => {
        currConfig.setConfig({ ...currConfig, userData: data });
        console.log({ ...currConfig, userData: data });

        // Clear the ItemForm
        nameRef.current.value = "";
        descriptionRef.current.value = "";

        // Close the ItemForm
        setFormShown(false);
        // TODO: Give a message that the value has been added
      })
  }

  return (
    <form
      className="form-general form-item"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1> Item </h1>
      <label>
        <span>Name</span>
        <input type="text" ref={nameRef}/>
      </label>
      <label>
        <span> Price </span>
        <div className='price-label'>
          <input type="text"
            onChange={(e) => handlePriceRef(setPrice, e.target.value)}
            value={priceState} />
          <select ref={currencyRef}>
            <option value={"AUD"}> AUD </option>
            <option value={"BDT"}> BDT </option>
          </select>
        </div>
      </label>

      <div className="button-area">
        <button onClick={() => handleSubmit()}> Submit </button>
        <button onClick={() => setFormShown(false)}> Cancel </button>
      </div>
    </form>
  )
}

function handlePriceRef(setter, newValue) {
  for (let i = 0; i < newValue.length; i++) {
    if (!"123456789.".includes(newValue[i])) {
      return;
    }
  }

  setter(newValue);
}

export default ItemForm;
