import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tempListId: null,
};

export const wishListSlice = createSlice({
  name: "wishList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTempListId: (state, action) => {
      state.tempListId = action.payload;
    },
  },
});

export const { setTempListId } = wishListSlice.actions;

export default wishListSlice.reducer;
