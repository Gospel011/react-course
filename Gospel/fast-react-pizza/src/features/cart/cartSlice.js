import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId != action.payload,
      );
    },
    incrementQuantity(state, action) {
      state.cart = state.map((el) => {
        if (el.pizzaId == action.payload) {
          el.quantity += 1;
          el.totalPrice = el.quantity * el.unitPrice;
        }

        return el;
      });
    },
    decrementQuantity(state, action) {
      state.cart = state.map((el) => {
        if (el.pizzaId == action.payload && el.quantity > 0) {
          el.quantity -= 1;
        }

        return el;
      });
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;

export const getTotalCartQuantity = (store) =>
    store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (store) =>
    store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export default cartReducer;
