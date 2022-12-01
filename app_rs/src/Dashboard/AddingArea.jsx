
function AddingArea() {
  return (
    <div className="adding-area">
      <Separator />
      <div className="card-section">
        <AdderCard content={"Receipt"} />
        <AdderCard content={"Item"} />
        <AdderCard content={"Category"} />
      </div>
    </div>
  )
}

function Separator() {
  return (
    <div className="separator">
      <div className="line"></div>
      <div className="down-arrow">➤</div>
      <div className="line"></div>
    </div>
  )
}

function AdderCard( { content, callback } ) {
  return (
    <div className="adder-card" onClick={callback}>
      {content}
    </div>
  )
}

export default AddingArea;
