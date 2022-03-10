import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tempListId: null,
  tempListName: "",
  tempList: [{}],
  tempListVisibility: "public",
  tempListSlug: "",
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
      state.tempList = action.payload;
    },
    setTempListVisibility: (state, action) => {
      state.tempListVisibility = action.payload;
    },
    setTempListSlug: (state, action) => {
      state.tempListSlug = action.payload;
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
  setTempListSlug,
  clearTempList,
} = wishListSlice.actions;

export default wishListSlice.reducer;
