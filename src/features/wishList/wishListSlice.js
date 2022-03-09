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
  },
});

export const {
  setTempListId,
  setTempListName,
  setTempList,
  setTempListVisibility,
} = wishListSlice.actions;

export default wishListSlice.reducer;
