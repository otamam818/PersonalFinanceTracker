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

export default ItemAtom;
