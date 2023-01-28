import {Separator} from "./static";
import chooseForm from "./forms/chooseForm";
import "./forms/style.scss";

function AddingArea( { setChosenForm, formIsShown } ) {
  let buttonFields = ["Receipt", "Item", "Category"];
  let buttons = buttonFields.map((value, index) => {
    return (
      <AdderCard
        key={index}
        content={value}
        callback={() => {
          formIsShown.set(true);
          let newFormValue = chooseForm(value, formIsShown);
          setChosenForm(newFormValue);
        }}
      />
    )
  });

  return (
    <div className="adding-area">
      <Separator />
      <div className="card-section">
        {buttons}
      </div>
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
