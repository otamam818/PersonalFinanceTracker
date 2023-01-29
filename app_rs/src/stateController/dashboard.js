import { createSlice } from "@reduxjs/toolkit";

export const selectedSections = {
  history: "history",
  graphicalData: "graphs",
}

export const configSlice = createSlice({
  name: 'dashboard',
  initialState: {
    overlayComponent: null,
    currSelectedSection: selectedSections.history
  },

  reducers: {
    /** @function changes the string that indicates which component
     *            to show on top of the FormOverlay
     *  @param {string} component
     */
    setOverlayComponent: (state, component) => {
      state.overlayComponent = component.payload;
    },
  },
});

export const { setOverlayComponent } = configSlice.actions;
export default configSlice.reducer;

