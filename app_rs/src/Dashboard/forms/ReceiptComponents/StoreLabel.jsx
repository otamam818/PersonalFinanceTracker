/**
 * @fileoverview Asks the user about the place the receipt was generated
 *               whether it is a store, restaurant or something else is for
 *               the user to decide
 */
import {useState} from 'react';
import StoreDropDown from './StoreDropdown';

function StoreLabel() {
  const [storeValue, setStoreValue] = useState("");

  // The user has the ability to choose from a dropdown of choices.
  // This state manages when it is visible
  const [dropDownVisible, setDropdownVisible] = useState(false);

  return (
    <label
      onFocus={() => setDropdownVisible(true)}
      onBlur={() => setDropdownVisible(false)}
    >
      <span>Store</span>
      <input
        type="text"
        onChange={(e) => setStoreValue(e.target.value)}
        htmlFor="store-name"
        value={storeValue} />
      <StoreDropDown
        data={{
          storeValue,
          setStoreValue,
          isVisible: dropDownVisible,
          setVisibility: setDropdownVisible
      }} />
    </label>
  )
}

export default StoreLabel;
