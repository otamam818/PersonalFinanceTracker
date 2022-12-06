import ReceiptForm from "./ReceiptForm";
import CategoryForm from "./CategoryForm";
import ItemForm from "./ItemForm";

function chooseForm(dataInput, setFormShown, currConfig) {
  switch (dataInput) {
    case "Receipt":
      return <ReceiptForm
      setFormShown={setFormShown}
      currConfig={currConfig}/>
    case "Item":
      return <ItemForm
      setFormShown={setFormShown}
      currConfig={currConfig}/>
    case "Category":
      return <CategoryForm
      setFormShown={setFormShown}
      currConfig={currConfig}/>
    default:
      return <div>404 Not found</div>
  }
}

export default chooseForm;
