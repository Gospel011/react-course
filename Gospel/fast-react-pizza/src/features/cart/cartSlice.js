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
      // payload = id
      state.cart = state.cart.filter((pizza) => pizza.id != action.payload);
    },
    incrementQuantity(state, action) {
      state.cart = state.cart.map((el) => {
        if (el.id == action.payload) {
          el.quantity += 1;
          el.totalPrice = el.quantity * el.unitPrice;
        }

        return el;
      });
    },
    decrementQuantity(state, action) {
      let removeItem = false;
      state.cart = state.cart.map((el) => {
        if (el.id == action.payload && el.quantity > 0) {
          el.quantity -= 1;
          el.totalPrice = el.quantity * el.unitPrice;
          if (el.quantity === 0) {
            removeItem = true;
          }
        }

        return el;
      });

      if (removeItem) {
        console.log({ action });
        cartSlice.caseReducers.deleteItem(state, action);
      }
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

export const getPizzaQuantity = (id) => (store) =>
  store.cart.cart.find((el) => el.id == id)?.quantity ?? 0;

export const getCart = (store) => store.cart.cart;

export const getTotalCartPrice = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export default cartReducer;
