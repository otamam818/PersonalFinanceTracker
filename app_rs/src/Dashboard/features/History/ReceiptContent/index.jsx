function ReceiptContent({ data }) {
  return data.get.map((atom, index) => {
    const {date, currency, items, store, time} = atom;
    let itemArray = items.map((value, index) => {
      const [name, price, quantity] = value.split(" | ");
      return (
        <div className="item-atom" key={index}>
          <span className="name"> {name} </span>
          <br/>
          <span> {price}{currency} x {quantity} </span>
          <hr/>
          <strong>
            {(parseFloat(price) * parseInt(quantity)).toFixed(2)}{currency}
          </strong>
        </div>
      )
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

export default ReceiptContent;

