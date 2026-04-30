import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
const store = configureStore({
  reducer: { auth: authReducer, theme: themeReducer },
  // add more slices here (for posts)
});

export default store;
