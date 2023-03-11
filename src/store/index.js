import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import authReducer from "./auth-slice";
import emailReducer from "./email-slice";

const store = configureStore({
  reducer: { ui: uiReducer, auth: authReducer, emailStore: emailReducer },
});

export default store;
