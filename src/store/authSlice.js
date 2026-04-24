import { createSlice } from "@reduxjs/toolkit";
// for storing that current user is logged in or not.
const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions; // there is actions , not reducers.
export default authSlice.reducer;
