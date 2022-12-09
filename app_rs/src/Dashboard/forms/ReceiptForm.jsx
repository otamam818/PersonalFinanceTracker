import {useRef, useState} from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import StoreDropDown from './ReceiptComponents/StoreDropdown';

function ReceiptForm ( { setFormShown, currConfig } ) {
  const [storeValue, setStoreValue] = useState("");
  const [chosenStore, setChosenStore] = useState(null);
  const [dropDownVisible, setDropdownVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const dateRef = useRef(null);

  return (
    <form
      className="form-general form-category"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1> Receipt </h1>
      <label
        onFocus={() => setDropdownVisible(true)}
        onBlur={() => setDropdownVisible(false)}
      >
        <span>Store</span>
        <input
          type="text"
          onChange={(e) => setStoreValue(e.target.value)}
          list="stores"
          value={storeValue} />
        {feedbackMessage}
        <StoreDropDown
          currConfig={currConfig}
          data={{
            storeValue,
            setStoreValue,
            setFeedbackMessage,
            isVisible: dropDownVisible,
            setVisibility: setDropdownVisible
          }}
          setChosenStore={setChosenStore}
          dateRef={dateRef} />
      </label>
      <label className='widespread'>
        <span>Date</span>
        <div className='price-label'>
          <input type="text" placeholder='DD' ref={dateRef} onChange={(e) => console.log(e.target.value)}/>
          <input type="text" placeholder='MM' />
          <input type="text" placeholder='YY' />
        </div>
        <span>Time</span>
        <div className='price-label'>
          <input type="text" placeholder='HH' />
          <input type="text" placeholder='MM' />
        </div>
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

function setAppropriately(event, min, max, length) {
  event.preventDefault();
  let elem = event.target;
  let value = elem.value;
  let valueNum = parseInt(value);
  if (valueNum <= max && valueNum >= min && value.length <= length) {
    elem.value = value;
  }
}

export default ReceiptForm;

