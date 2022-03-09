import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tempListId: null,
  tempListName: "",
  tempList: [{}],
  tempListVisibility: "public",
};

export const wishListSlice = createSlice({
  name: "wishList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTempListId: (state, action) => {
      state.tempListId = action.payload;
    },
    setTempListName: (state, action) => {
      state.tempListName = action.payload;
    },
    setTempList: (state, action) => {
      console.log(state);
      state.tempList = action.payload;
    },
    setTempListVisibility: (state, action) => {
      state.tempListVisibility = action.payload;
    },
    clearTempList: (state) => {
      state.tempList = [{}];
      state.tempListName = "";
      state.tempListVisibility = "public";
    },
  },
});

export const {
  setTempListId,
  setTempListName,
  setTempList,
  setTempListVisibility,
  clearTempList,
} = wishListSlice.actions;

export default wishListSlice.reducer;
