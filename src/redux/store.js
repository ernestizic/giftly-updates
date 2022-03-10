import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alert/alertSlice";
import wishListReducer from "../features/wishList/wishListSlice";
import persistStore from "redux-persist/es/persistStore";

const reducers = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  wishList: wishListReducer,
});

const persistConfig = {
  key: "giftly:root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
