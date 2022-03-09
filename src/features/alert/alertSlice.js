import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  msg: "",
  alertTimeout: 0,
};

export const alertSlice = createSlice({
  name: "alert",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.msg = action.payload;
    },
    setAlertTimeout: (state, action) => {
      state.alertTimeout = action.payload;
    },
    clearAlert: (state) => {
      state.msg = "";

      clearTimeout(state.alertTimeout);

      state.timeout = 0;
    },
  },
});

export const { showAlert, clearAlert, setAlertTimeout } = alertSlice.actions;

export default alertSlice.reducer;
