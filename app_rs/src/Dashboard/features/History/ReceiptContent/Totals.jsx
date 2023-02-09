import {useEffect, useState} from "react";

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

export default Totals;
