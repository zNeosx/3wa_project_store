import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import adminReducer from "../features/adminSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    admin: adminReducer,
  },
});
