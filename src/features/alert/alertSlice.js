import { createSlice } from "@reduxjs/toolkit";
// ALERT TYPES ARE: success, error, warning, info
// Alert action
export const setAlert =(alert)=> async (dispatch) => {
  dispatch(showAlert(alert))
  setTimeout(()=> {
    dispatch(clearAlert())
  }, 5000)
}

const initialState = {
  msg: "",
};

export const alertSlice = createSlice({
  name: "alert",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.msg = action.payload;
    },
    clearAlert: (state) => {
      state.msg = "";
    },
  },
});

export const { showAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
