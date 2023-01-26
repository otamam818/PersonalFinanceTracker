import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: 'configuration',
  initialState: {
    filePath: "",

    // TODO: Change this to be initially an empty string and instead ask the 
    // user for their name
    name: "Oisho",

    // This decides which component gets rendered into the main body of the
    // app (essentially pretending to be a react-router)
    bodyComponent: "welcome",
  },

  reducers: {
    /** @function changes the filepath to a new one
     *  @param {string} path
     */
    setFilePath: (state, path) => {
      state.filePath = path;
    },

    /** @function changes the filepath to a new one
     *  @param {string} path
     */
    setUserName: (state, name) => {
      state.name = name;
    },

    /** @function changes what component gets rendered
     *  @param {string} componentKey The key that is used in a switch
     *                  statement to decide which component gets rendered
     */
    setBodyComponent: (state, componentKey) => {
      state.bodyComponent = componentKey.payload;
    },
  },
});

export const {setFilePath, setUserName, setBodyComponent} = configSlice.actions;
export default configSlice.reducer;

