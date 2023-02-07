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
      <div key={index}>
        <span className="store-name"> {store} </span>
        <span className="datetime"> {date} at {time} </span>
        <br/>
        <div className="spread">
          {itemArray}
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

export default ReceiptContent;

