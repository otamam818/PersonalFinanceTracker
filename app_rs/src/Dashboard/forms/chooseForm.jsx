import ReceiptForm from "./ReceiptForm";
import CategoryForm from "./CategoryForm";
import ItemForm from "./ItemForm";

function chooseForm(dataInput, formIsShown, currConfig) {
  switch (dataInput) {
    case "Receipt":
      return <ReceiptForm
      formIsShown={formIsShown}
      currConfig={currConfig}/>
    case "Item":
      return <ItemForm
      formIsShown={formIsShown} />
    case "Category":
      return <CategoryForm
      formIsShown={formIsShown} />
    default:
      return <div>404 Not found</div>
  }
}

export default chooseForm;
