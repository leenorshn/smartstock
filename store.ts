import { configureStore } from "@reduxjs/toolkit";
import operationReducers from "./slices/operation_slice";
import productReducers from "./slices/product_slice";

export const store = configureStore({
  reducer: {
    product: productReducers,
    operation: operationReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
