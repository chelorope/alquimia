import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slices/globalSlice";

export const store = configureStore({
  reducer: { globalReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
