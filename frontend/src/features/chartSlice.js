import { createSlice } from "@reduxjs/toolkit";

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    chart: [],
  },
  reducers: {
    init: (state, action) => {
      state.chart = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { init } = chartSlice.actions;

export default chartSlice.reducer;
