import { configureStore } from "@reduxjs/toolkit";
import configReducer from './stateController/config';
import dashboardHome from "./stateController/dashboardHome";
import userDataReducer from './stateController/userData';

export default configureStore({
  reducer: {
    configuration: configReducer,
    userData: userDataReducer,
    dashboardHome: dashboardHome,
  }
});

