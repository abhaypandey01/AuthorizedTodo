import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer, // Ensure this is added
    user: authReducer,
  },
});
