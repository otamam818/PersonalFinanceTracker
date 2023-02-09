import ReceiptHeader from "./ReceiptHeader";
import ReceiptData from "./ReceiptData";

function ReceiptContent({ data }) {
  return data.get.map((atom, index) => {
    return (
      <div key={index} data-index={index} className="receipt-atom">
        <ReceiptHeader atom={atom} />
        <ReceiptData atom={atom} index={index} />
      </div>
    )
  });
}

export default ReceiptContent;

