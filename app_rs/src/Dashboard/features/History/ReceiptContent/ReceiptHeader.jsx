import InfoContent from "./InfoContent";
import Buttons from "./Buttons";

function ReceiptHeader( { atom }) {
  return (
    <div className="spread">
      <InfoContent {...atom} />
      <Buttons receiptKey={atom.receipt_key} />
    </div>
  )
}

export default ReceiptHeader;
