/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import {
  addItem,
  getPizzaQuantity,
} from "../cart/cartSlice";
import DeleteButton from "../cart/DeleteButton";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const orderQuantity = useSelector(getPizzaQuantity(id));

  console.log({ orderQuantity });

  const dispatch = useDispatch();

  function handleAddToCart() {
    
    const newPizza = {
      ...pizza,
      quantity: 1,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newPizza));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium text-stone-500 uppercase">
              Sold out
            </p>
          )}

          {orderQuantity > 0 && <DeleteButton pizzaId={id} />}

          {!soldOut && !orderQuantity && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
