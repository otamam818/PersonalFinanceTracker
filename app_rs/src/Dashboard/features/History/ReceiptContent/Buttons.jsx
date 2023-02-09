import {Delete, Edit2} from "react-feather";

function Buttons( { receiptKey } ) {
  function handleEdit() {
    // Should create a pop-up with a filled-up ReceiptForm, in a way that
    // implies the user can change it, and it will update the current data
  }

  function handleDelete() {
    // Should create a pop-up confirming whether the user actually wants to
    // delete the receipt or not
  }

  return (
    <div className="actions">
      <button className="action-button">
        <Edit2 color="white" />
      </button>
      <button className="action-button">
        <Delete color="white" />
      </button>
    </div>
  )
}

export default Buttons;
