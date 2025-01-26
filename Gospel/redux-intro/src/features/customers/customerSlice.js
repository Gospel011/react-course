import { createSlice } from "@reduxjs/toolkit";

//* INITIAL STATE
const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

//* REDUCER - SLICE
const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },

    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

const customerReducer = customerSlice.reducer;

export default customerReducer;

export const { createCustomer, updateName } = customerSlice.actions;
