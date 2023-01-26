import { configureStore } from "@reduxjs/toolkit";
import configReducer from './stateController/config';
import userDataReducer from './stateController/userData';

export default configureStore({
  reducer: {
    configuration: configReducer,
    userData: userDataReducer
  }
});

