import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [
      {
        id: 1,
        name: "John Doe",
      },
    ],
    foods: [],
  },
  reducers: {
    initUserState: (state, action) => {
      state.users = action.payload;
    },
    initFoodState: (state, action) => {
      state.foods = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initUserState, initFoodState } = adminSlice.actions;

export default adminSlice.reducer;
