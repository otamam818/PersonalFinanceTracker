import {useState} from 'react';
import StoreDropDown from './StoreDropdown';

function StoreLabel( { setChosenStore, dateRef, currConfig } ) {
  const [storeValue, setStoreValue] = useState("");
  const [dropDownVisible, setDropdownVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  return (
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
  )
}

export default StoreLabel;
