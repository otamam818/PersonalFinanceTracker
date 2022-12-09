import {useRef, useState} from 'react';
// import { invoke } from '@tauri-apps/api/tauri';
import StoreLabel from './ReceiptComponents/StoreLabel';
import DateTimeLabel from './ReceiptComponents/DateTimeLabel';

function ReceiptForm ( { setFormShown, currConfig } ) {
  const [_, setChosenStore] = useState(null);
  const dateRef = useRef(null);

  return (
    <form
      className="form-general form-category"
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <h1> Receipt </h1>
      <StoreLabel
        setChosenStore={setChosenStore}
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

