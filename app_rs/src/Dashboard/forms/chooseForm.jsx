import ReceiptForm from "./ReceiptForm";
import CategoryForm from "./CategoryForm";
import ItemForm from "./ItemForm";

function chooseForm(dataInput) {
  switch (dataInput) {
    case "Receipt": return <ReceiptForm />
    case "Item": return <ItemForm />
    case "Category": return <CategoryForm />
    default: return <div>404 Not found</div>
  }
}

export default chooseForm;
