import {Separator} from "./static";
import chooseForm from "./forms/chooseForm";
import "./forms/style.scss";

function AddingArea( { setChosenForm, setFormShown } ) {
  let buttonFields = ["Receipt", "Item", "Category"];
  let buttons = buttonFields.map((value, _) => {
    return (
      <AdderCard
        content={value}
        callback={() => {
          setFormShown(true);
          let newFormValue = chooseForm(value, setFormShown);
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
