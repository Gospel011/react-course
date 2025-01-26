import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decrementQuantity, incrementQuantity } from "./cartSlice";

// eslint-disable-next-line react/prop-types
function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-2">
      <Button
        type={"round"}
        onClick={() => dispatch(decrementQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type={"round"}
        onClick={() => dispatch(incrementQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
