/**
 * @fileoverview Manages the whole Receipt form and its sub-components
 * @author Tahmin Ahmed (www.github.com/otamam818)
 */
import {useRef} from 'react';
import StoreLabel from './ReceiptComponents/StoreLabel';
import DateTimeLabel from './ReceiptComponents/DateTimeLabel';
import ItemLabel from './ReceiptComponents/ItemLabel';

function ReceiptForm ( { setFormShown, currConfig } ) {
  const dateRef = useRef(null);
  console.log(currConfig);
  return (
    <form
      className="form-general form-category"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1> Receipt </h1>
      <StoreLabel
        dateRef={dateRef}
        currConfig={currConfig} />
      <DateTimeLabel dateRef={dateRef} />

      <ItemLabel currConfig={currConfig} />

      <div className="button-area">
        <button onClick={() => handleSubmit()}> Submit </button>
        <button onClick={() => setFormShown(false)}> Cancel </button>
      </div>
    </form>
  )
}

export default ReceiptForm;

