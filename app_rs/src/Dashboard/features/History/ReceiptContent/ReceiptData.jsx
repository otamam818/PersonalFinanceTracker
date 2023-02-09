import ItemArray from "./ItemArray";
import Totals from "./Totals";

function ReceiptData( { atom, index }) {
  return (
    <div className="spread">
      <ItemArray {...atom} />
      <Totals index={index} currency={atom.currency} />
    </div>
  )
}

export default ReceiptData;
