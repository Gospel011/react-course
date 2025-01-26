import { formatCurrency } from "../../utils/helpers";
import DeleteButton from "./DeleteButton";
import UpdateItemQuantity from "./UpdateItemQuantity";

// eslint-disable-next-line react/prop-types
function CartItem({ item }) {
  // eslint-disable-next-line react/prop-types
  const { id, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center gap-4 sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity pizzaId={id} />
        <DeleteButton pizzaId={id} />
      </div>
    </li>
  );
}

export default CartItem;
