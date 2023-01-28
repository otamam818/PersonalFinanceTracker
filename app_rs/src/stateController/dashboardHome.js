import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: 'dashboardHome',
  initialState: {
    loadState: "loading"
  },

  reducers: {
    /** @function changes the filepath to a new one
     *  @param {string} path
     */
    setIsLoading: (state, situation) => {
      state.isLoading = situation.payload;
    },
  },
});

export const { setIsLoading } = configSlice.actions;
export default configSlice.reducer;

