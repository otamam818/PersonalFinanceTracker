import {useEffect, useState} from "react";

function ReceiptContent({ data }) {
  return data.get.map((atom, index) => {
    const {date, currency, items, store, time} = atom;
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
      <div key={index} data-index={index} className="receipt-atom">
        <div className="spread">
          <div className="info-content">
            <span className="store-name"> {store} </span>
            <span className="datetime"> {date} at {time} </span>
          </div>
          <div className="actions">
            <button> X </button>
            <button> Y </button>
          </div>
        </div>
        <div className="spread">
          <div className="item-contents">
            {itemArray}
          </div>
          <Totals index={index} currency={currency} />
        </div>
      </div>
    )
  });
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

