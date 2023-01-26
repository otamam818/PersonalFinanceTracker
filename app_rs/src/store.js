import { configureStore } from "@reduxjs/toolkit";
import configReducer from './stateController/config';

export default configureStore({
  reducer: {
    configuration: configReducer
  }
});

