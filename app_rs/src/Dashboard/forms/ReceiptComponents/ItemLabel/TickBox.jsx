import {useState} from "react";
import {MoreHorizontal} from "react-feather";
import { useSelector } from 'react-redux';
import { makeState } from "../../../../utils";

function TickBox( { value } ) {
  const overlayData = useSelector(state => state.dashboard.overlayData);
  let [quantity, setQuantity]
    = useState(overlayData?.items[value.id] ? overlayData.items[value.id] : 0);

  let hasNoQuantity = quantity === 0;
  let newestPrice = value.prices[value.prices.length - 1];

  return (
    <div
      className="check-box"
      data-selected={!hasNoQuantity}
    >
      <TickBoxEdit />
      <span>{value.name}({newestPrice}){value.currency}</span>
      <span className="item-id" data-chosen={!hasNoQuantity} hidden >{value.id}</span>
      <div className="quantity-modifier">
        <div className="options--button prepend" onClick={() => {
          if (quantity > 0) {
            setQuantity(quantity-1)
          }
        }}> - </div>

        <div
          id="check-box--quantity"
          className="number-showcase"
          data-chosen={!hasNoQuantity}
        >
          {quantity}
        </div>

        <div className="options--button append" onClick={() => {
          setQuantity(quantity+1);
        }}> + </div>
      </div>
    </div>
  )
}

function TickBoxEdit () {
  const currColor = makeState("grey");
  const isClicked = makeState(false);
  // TODO: Implement the delete function
  let currComponent = isClicked.get
    ? (
      <div className="spread" >
        <CornerDownLeft color="grey" onClick={() => isClicked.set(false)} />
        <Trash2 color="grey" />
      </div>
    )
    : <MoreHorizontal
      onClick={() => isClicked.set(true)}
      className="more-button"
      color={currColor.get}
      onMouseEnter={() => currColor.set("white")}
      onMouseLeave={() => currColor.set("grey")}
    />
  return currComponent;
}

export default TickBox;
