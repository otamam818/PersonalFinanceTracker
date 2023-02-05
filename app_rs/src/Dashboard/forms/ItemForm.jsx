import {useRef, useState} from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { setUserData } from '../../stateController/userData';
import { setOverlayComponent } from '../../stateController/dashboard';
import { useSelector, useDispatch } from 'react-redux';

function ItemForm () {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.data);
  const nameRef = useRef(null);
  const [priceState, setPrice] = useState("")
  const currencyRef = useRef(null);

  function handleSubmit () {
    let name = nameRef.current.value;
    let price = priceState;
    let currency = currencyRef.current.value;

    appendItem(userData, name, price, currency)
      .then((data) => {
        dispatch(setUserData(data));

        // Clear the ItemForm
        nameRef.current.value = "";

        // Close the ItemForm
        formIsShown.set(false);
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
        <button onClick={() => dispatch(setOverlayComponent(null))}>
          Cancel
        </button>
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

export async function appendItem(userData, name, price, currency) {
  return await invoke(
    "append_item",
    {
      dataMap: userData,
      name,
      price,
      currency
    }
  );
}

export default ItemForm;
