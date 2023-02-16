import {useSelector} from "react-redux";

function DeleteCard () {
  const { message, callbackYes, callbackNo }
    = useSelector(state => state.dashboard.overlayData);
  return (
    <div className="delete-card">
      <strong> {message} </strong>
      <div className="spread">
        <button className="options--button delete" onClick={() => callbackYes()}>
          Yes
        </button>
        <button className="options--button" onClick={() => callbackNo()}>
          No
        </button>
      </div>
    </div>
  )
}

export default DeleteCard;
