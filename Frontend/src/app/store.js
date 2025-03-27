import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product-list/productSlice";
import authReducer from "../features/auth/authSlice";
import cartSliceReducer from "../features/cart/cartSlice";
import orderSliceReducer from "../features/order/orderSlice";
import userSliceReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartSliceReducer,
    order: orderSliceReducer,
    user: userSliceReducer,
  },
});
