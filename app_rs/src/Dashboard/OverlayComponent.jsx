import ReceiptForm from "./forms/ReceiptForm";
import CategoryForm from "./forms/CategoryForm";
import ItemForm from "./forms/ItemForm";
import DeleteCard from "./features/common/DeleteCard";

function OverlayComponent({ dataInput }) {
  switch (dataInput) {
    case "Receipt":
      return <ReceiptForm />
    case "Item":
      return <ItemForm />
    case "Category":
      return <CategoryForm />
    case "Delete":
      return <DeleteCard />
    case null:
      return null
    default:
      return <div>404 Not found</div>
  }
}

export default OverlayComponent;
