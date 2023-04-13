import { createSlice } from "@reduxjs/toolkit";
import { logout, setAuthInfo } from "../reducers/auth-reducers";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userId: null,
    name: null,
    email: null,
  },
  reducers: {
    setAuthInfo,
    logout,
  },
});

export const authActions = authSlice.actions;

export default authSlice;
