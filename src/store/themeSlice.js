import { createSlice } from "@reduxjs/toolkit";
// for storing that current user is logged in or not.
const initialState = {
  themeMode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    light: (state) => {
      state.themeMode = "light";
    },
    dark: (state) => {
      state.themeMode = "dark";
    },
  },
});

export const { light, dark } = themeSlice.actions; // there is actions , not reducers.
export default themeSlice.reducer;
