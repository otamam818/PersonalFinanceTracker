function DateTimeLabel( { dateRef } ) {
  return (
      <label className='widespread'>
        <span>Date</span>
        <div className='price-label'>
          <input type="text" placeholder='DD' ref={dateRef} onChange={(e) => console.log(e.target.value)}/>
          <input type="text" placeholder='MM' />
          <input type="text" placeholder='YY' />
        </div>
        <span>Time</span>
        <div className='price-label'>
          <input type="text" placeholder='HH' />
          <input type="text" placeholder='MM' />
        </div>
      </label>
  )
}

export default DateTimeLabel;
