import {useState} from "react";

function ItemInputs () {
  const [priceVal, setPriceVal] = useState("");

  return (
    <div className='item-box' > 
      <div className="name">
        <span> Name </span>
        <input type="text" placeholder="required" />
      </div>
      <div className="price">
        <span> Price </span>
        <input
          type="text"
          value={priceVal}
          placeholder="required"
          onChange={(e) => setValidFloat(setPriceVal, e.target.value)}
        />
      </div>
      <div className='price-label'>
        <span> &nbsp; </span>
        <select>
          <option value={"AUD"}> AUD </option>
          <option value={"BDT"}> BDT </option>
        </select>
      </div>
    </div>
  )
}

function setValidFloat(setter, value) {
  // Base case for when the user cleared the entry
  if (value === "") {
    setter(value);
    return;
  }

  console.log(value);
  let isValid = true;
  const validInputs = "1234567890.";
  Array.from(value).forEach((atom) => {
    isValid = isValid && validInputs.includes(atom);
  })

  // Prevent 2 or more decimal places from existing in the new value
  isValid
    = isValid &&
    Array.from(value).filter((atom) => atom === '.').length < 2

  if (isValid) {
    setter(value);
  }
}

export default ItemInputs;
