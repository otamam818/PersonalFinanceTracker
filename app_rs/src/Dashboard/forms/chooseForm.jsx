import ReceiptForm from "./ReceiptForm";
import CategoryForm from "./CategoryForm";
import ItemForm from "./ItemForm";

function chooseForm(dataInput, setFormShown) {
  switch (dataInput) {
    case "Receipt": return <ReceiptForm setFormShown={setFormShown} />
    case "Item": return <ItemForm setFormShown={setFormShown} />
    case "Category": return <CategoryForm setFormShown={setFormShown} />
    default: return <div>404 Not found</div>
  }
}

export default chooseForm;
