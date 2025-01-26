// import { useState } from "react";

import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error,
  } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const isLoadingAddress = addressStatus === "loading";

  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();

  // const cart = fakeCart;
  const cart = useSelector((store) => store.cart.cart).map((item) => {
    const { id: pizzaId, name, quantity, unitPrice, totalPrice } = item;

    const newItem = {
      pizzaId,
      name,
      quantity,
      unitPrice,
      totalPrice,
      error,
    };

    return newItem;
  });

  const totalCartPrice = useSelector(getTotalCartPrice);

  let priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="firstName" className="sm:basis-40">
            First Name
          </label>
          <input
            type="text"
            className="input grow"
            name="customer"
            id="firstName"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="phone" className="sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <input
              type="tel"
              className="input w-full"
              name="phone"
              id="phone"
              required
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label htmlFor="address" className="sm:basis-40">
            Address
          </label>
          <div className="relative grow">
            <input
              type="text"
              className="input w-full"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              id="address"
              required
            />
            {!position.latitude && !position.longitude && (
              <span className="absolute top-[3px] right-[3px] md:top-[5px] md:right-[4px]">
                <Button
                  type={"small"}
                  className=""
                  disabled={isLoadingAddress}
                  onClick={(e) => {
                    e.preventDefault();

                    dispatch(fetchAddress());
                  }}
                >
                  Fetch Address
                </Button>
              </span>
            )}
            {addressStatus == "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting} type={"primary"}>
            {isSubmitting
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalCartPrice + priorityPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const order = Object.fromEntries(formData);

  const body = {
    ...order,
    cart: JSON.parse(order.cart),
    priority: order.priority == "true",
  };

  console.log({ body });

  const errors = {};

  if (!isValidPhone(body.phone))
    errors.phone =
      "Please give us your correct phone number, we might need to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  // return null;

  const newOrder = await createOrder(body);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
