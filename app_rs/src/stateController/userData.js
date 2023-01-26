import { open, save } from '@tauri-apps/api/dialog';
import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: 'userData',
  initialState: {
    data: null,
  },

  reducers: {
    /** @function changes the filepath to a new one
     *  @param {string} path
     */
    setUserData: (state, data) => {
      state.userData = data;
    },
  },
});

export const { setUserData } = configSlice.actions;
export default configSlice.reducer;

