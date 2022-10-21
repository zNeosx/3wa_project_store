import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setInitialState: (state) => {
      state.cart = [];
    },
    init: (state, action) => {
      state.cart = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInitialState, init } = cartSlice.actions;

export default cartSlice.reducer;
