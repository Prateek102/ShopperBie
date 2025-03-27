import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchAllItemsByUserid,
  updateCart,
  deleteCart,
  resetCart,
} from "./cartAPI";

const initialState = {
  status: "idle",
  items: [],
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const updateItemAsync = createAsyncThunk(
  "cart/updateCart",
  async (updatedItem) => {
    const response = await updateCart(updatedItem);
    return response.data;
  }
);

export const deleteItemAsync = createAsyncThunk(
  "cart/deleteCart",
  async (itemId) => {
    const response = await deleteCart(itemId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    //the value we return becomes fulfilled action payload
    return response.data;
  }
);

export const fetchAllItemsByUseridAsync = createAsyncThunk(
  "cart/fetchItemByUserId",
  async (userId) => {
    const response = await fetchAllItemsByUserid(userId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchAllItemsByUseridAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchAllItemsByUseridAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const { increment } = cartSlice.actions;
export const selectItems = (state) => state.cart.items;
export default cartSlice.reducer;
