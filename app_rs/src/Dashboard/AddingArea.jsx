import "./forms/style.scss";
import { useDispatch } from 'react-redux';
import { setOverlayComponent } from '../stateController/dashboard';

function AddingArea() {
  const buttonFields = ["Receipt", "Item", "Category"];
  const dispatch = useDispatch();
  let buttons = buttonFields.map((value, index) => {
    return (
      <AdderCard
        key={index}
        content={value}
        callback={() => {
          dispatch(setOverlayComponent(value));
        }}
      />
    )
  });

  return (
    <div className="card-section">
      {buttons}
    </div>
  )
}

function AdderCard( { content, callback } ) {
  return (
    <div className="options--button" onClick={callback}>
      {content}
    </div>
  )
}

export default AddingArea;
