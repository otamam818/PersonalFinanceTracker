import {useEffect, useState} from "react";
import {Delete, Edit2} from "react-feather";

function ReceiptContent({ data }) {
  return data.get.map((atom, index) => {
    return (
      <div key={index} data-index={index} className="receipt-atom">
        <ReceiptHeader atom={atom} />
        <ReceiptData atom={atom} index={index} />
      </div>
    )
  });
}

function ReceiptHeader( { atom }) {
  console.log(atom);
  return (
    <div className="spread">
      <InfoContent {...atom} />
      <Buttons receiptKey={atom.receipt_key} />
    </div>
  )
}

function ReceiptData( { atom, index }) {
  return (
    <div className="spread">
      <ItemArray {...atom} />
      <Totals index={index} currency={atom.currency} />
    </div>
  )
}

function InfoContent( { store, date, time } ) {
  return (
    <div className="info-content">
      <span className="store-name"> {store} </span>
      <span className="datetime"> {date} at {time} </span>
    </div>
  )
}

function Buttons( { receiptKey } ) {
  function handleEdit() {
    // Should create a pop-up with a filled-up ReceiptForm, in a way that
    // implies the user can change it, and it will update the current data
  }

  function handleDelete() {
    // Should create a pop-up confirming whether the user actually wants to
    // delete the receipt or not
  }

  return (
    <div className="actions">
      <button className="action-button">
        <Edit2 color="white" />
      </button>
      <button className="action-button">
        <Delete color="white" />
      </button>
    </div>
  )
}

function ItemArray( { items, currency } ) {
  let itemArray = items.map((value, index) => {
    const [name, price, quantity] = value.split(" | ");
    return <ItemAtom
      key={index}
      name={name}
      price={price}
      quantity={quantity}
      currency={currency}
    />
  });

  return (
    <div className="item-contents">
      {itemArray}
    </div>
  )
}

function ItemAtom( {name, price, quantity, currency } ) {
  return (
    <div className="item-atom">
      <span className="name"> {name} </span>
      <br/>
      <span> {price}{currency} x {quantity} </span>
      <hr/>
      <strong id="receipt-individual-price">
        {(parseFloat(price) * parseInt(quantity)).toFixed(2)}{currency}
      </strong>
    </div>
  );
}

function Totals( { index, currency } ) {
  let [totalPrice, setTotalPrice] = useState(undefined);
  useEffect(() => {
    setTotalPrice(
      // Adds all numbers from the specific array
      Array.from(document.querySelectorAll(
        `.receipt-atom[data-index="${index}"] .item-atom #receipt-individual-price`))
      .map((element) => parseFloat(element.innerHTML))
      .reduce((a, b) => a + b, 0).toFixed(2)
    );
  });

  return (
          <div className="totals">
            Total
            <hr />
            {currency}
            <br />
            {totalPrice}
          </div>
  );
}

export default ReceiptContent;

