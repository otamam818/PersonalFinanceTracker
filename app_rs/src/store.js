import { configureStore } from "@reduxjs/toolkit";
import configReducer from './stateController/config';
import dashboardReducer from "./stateController/dashboard";
import userDataReducer from './stateController/userData';

export default configureStore({
  reducer: {
    configuration: configReducer,
    userData: userDataReducer,
    dashboard: dashboardReducer,
  }
});

