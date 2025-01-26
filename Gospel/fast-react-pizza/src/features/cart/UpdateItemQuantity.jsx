import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decrementQuantity, incrementQuantity } from "./cartSlice";

// eslint-disable-next-line react/prop-types
function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Button
        type={"round"}
        onClick={() => dispatch(decrementQuantity(pizzaId))}
      >
        - {pizzaId}
      </Button>
      <Button type={"round"} onClick={() => incrementQuantity(pizzaId)}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
