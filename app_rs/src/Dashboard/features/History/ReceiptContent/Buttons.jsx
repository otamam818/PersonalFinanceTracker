import {invoke} from "@tauri-apps/api";
import {Delete, Edit2} from "react-feather";
import {useSelector, useDispatch} from "react-redux";
import {setOverlayComponent, setOverlayData} from "../../../../stateController/dashboard";
import {setUserData} from "../../../../stateController/userData";
import {setShouldRefresh} from "../../../../stateController/dashboard";

function Buttons( { receiptKey } ) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.userData.data);
  function handleEdit() {
    // Creates a pop-up with a filled-up ReceiptForm, in a way that
    // implies the user can change it, and it will update the current data
    invoke("get_receipt_of", { data, key: receiptKey })
      .then(innerData => {
        dispatch(setOverlayComponent("Receipt"));
        dispatch(setOverlayData({...innerData, receiptKey}));
      })
  }

  function handleDelete() {
    // Should create a pop-up confirming whether the user actually wants to
    // delete the receipt or not
    invoke("delete_receipt_by_key", { dataMap: data, receiptKey })
      .then(newUserData => {
        // console.log({newUserData});
        dispatch(setUserData(newUserData));
        dispatch(setShouldRefresh(true));
      })
  }

  return (
    <div className="actions">
      <button onClick={() => handleEdit()} className="action-button">
        <Edit2 color="white" />
      </button>
      <button onClick={() => handleDelete()} className="action-button">
        <Delete color="white" />
      </button>
    </div>
  )
}

export default Buttons;
