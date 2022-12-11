function ItemLabel() {
  return (
    <label>
      <span> Items </span>
      <div className='form--box item-box'> 
        <div>
          <span> Name </span>
          <input type="text" />
        </div>
        <div>
          <span> Price </span>
          <input type="text" />
        </div>
        <div className='price-label'>
          <span> Currency </span>
          <select>
            <option value={"AUD"}> AUD </option>
            <option value={"BDT"}> BDT </option>
          </select>
        </div>
      </div>
    </label>
  )
}

export default ItemLabel;
