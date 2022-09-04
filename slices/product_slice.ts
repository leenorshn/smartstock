import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  _id?: string;
  origin_name: string;
  local_name: string;
  code_bar: string;
  model: string;
  quantity: number;
  date?: number;
}

const initialState: ProductState[] = [];

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadProducts: (state, action: PayloadAction<ProductState[]>) => {
      return (state = [...action.payload]);
    },
    addProduct: (state, action: PayloadAction<ProductState>) => {
      return (state = [action.payload, ...state]);
    },
    updateProduct: (state, action: PayloadAction<ProductState>) => {
      state.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      const products = state.find((p) => p._id !== action.payload);
      state.push(products);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, updateProduct, deleteProduct, loadProducts } =
  productSlice.actions;

export default productSlice.reducer;
