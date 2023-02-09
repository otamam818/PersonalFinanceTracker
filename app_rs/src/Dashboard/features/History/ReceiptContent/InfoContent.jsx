function InfoContent( { store, date, time } ) {
  return (
    <div className="info-content">
      <span className="store-name"> {store} </span>
      <span className="datetime"> {date} at {time} </span>
    </div>
  )
}

export default InfoContent;
