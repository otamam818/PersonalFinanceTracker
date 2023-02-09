import ItemAtom from "./ItemAtom";

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

export default ItemArray;
