import { createSlice } from "@reduxjs/toolkit";

export const loadStates = {
  isLoading: "isloading",
  hasLoaded: "hasLoaded",
  isEmpty:   "isEmpty",
}

export const configSlice = createSlice({
  name: 'userData',
  initialState: {
    data: null,
    isEmpty: true,
    loadState: loadStates.isLoading,
  },

  reducers: {
    /** @function changes the data into a DataMap struct
     *  @param {DataFile} data
     */
    setUserData: (state, data) => {
      state.data = data.payload;
    },

    /** @function changes the state of the Dashboard
     *  @param {boolean} loadState
     */
    setLoadState: (state, loadState) => {
      state.loadState = loadState.payload;
    },
  },
});

export const { setUserData, setLoadState } = configSlice.actions;
export default configSlice.reducer;

