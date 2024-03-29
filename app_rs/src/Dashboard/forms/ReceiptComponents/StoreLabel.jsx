/**
 * @fileoverview Asks the user about the place the receipt was generated
 *               whether it is a store, restaurant or something else is for
 *               the user to decide
 */
import {useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import StoreDropDown from './StoreDropdown';

function StoreLabel() {
  const parentRef = useRef(null);

  // The user has the ability to choose from a dropdown of choices.
  // This state manages when it is visible
  const [dropDownVisible, setDropdownVisible] = useState(false);
  const overlayData = useSelector(state => state.dashboard.overlayData);
  const [storeValue, setStoreValue]
    = useState(overlayData ? overlayData.store_id : "");

  return (
    <label
      onFocus={() => setDropdownVisible(true)}
      onBlur={(e) => {
        // Check if the current active Element is a child of this label or
        // not
        if (!e.relatedTarget) {
          setDropdownVisible(false);
        }
      }}
      ref={parentRef}
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
