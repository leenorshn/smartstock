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

export interface OperationState {
  _id?: string;
  product_id: ProductState;
  type: string;
  amount: number;
  date: number;
}

const initialState: OperationState[] = [];

export const operationSlice = createSlice({
  name: "operation",
  initialState,
  reducers: {
    loadOperations: (state, action: PayloadAction<OperationState[]>) => {
      return (state = [...action.payload]);
    },
    addOperation: (state, action: PayloadAction<OperationState>) => {
      return (state = [action.payload, ...state]);
    },
    deleteOperation: (state, action: PayloadAction<string>) => {
      const operations = state.find((p) => p._id !== action.payload);
      state.push(operations);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addOperation, deleteOperation, loadOperations } =
  operationSlice.actions;

export default operationSlice.reducer;
