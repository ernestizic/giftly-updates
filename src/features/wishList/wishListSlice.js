import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tempListId: null,
  tempList: [{}],
};

export const wishListSlice = createSlice({
  name: "wishList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTempListId: (state, action) => {
      state.tempListId = action.payload;
    },
    setTempList: (state, action) => {
      state.tempList = action.payload;
    },
  },
});

export const { setTempListId, setTempList } = wishListSlice.actions;

export default wishListSlice.reducer;
