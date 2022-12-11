/**
 * @fileoverview Manages the whole Receipt form and its sub-components
 * @author Tahmin Ahmed (www.github.com/otamam818)
 */
import {useRef, useState} from 'react';
import StoreLabel from './ReceiptComponents/StoreLabel';
import DateTimeLabel from './ReceiptComponents/DateTimeLabel';

function ReceiptForm ( { setFormShown, currConfig } ) {
  const dateRef = useRef(null);
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

      <div className="button-area">
        <button onClick={() => handleSubmit()}> Submit </button>
        <button onClick={() => setFormShown(false)}> Cancel </button>
      </div>
    </form>
  )
}

export default ReceiptForm;

