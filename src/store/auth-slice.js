import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  isLoggedIn: localStorage.getItem('isLoggedIn'),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.idToken;
      state.email = action.payload.email;
      state.isLoggedIn = true;

      localStorage.setItem("isLoggedIn", state.isLoggedIn);
      localStorage.setItem("token", state.token);
      localStorage.setItem("email", state.email);
    },
    logout(state) {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('isLoggedIn');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
