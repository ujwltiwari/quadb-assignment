import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/slice.js";
import wishlistReducer from "./wishlist/slice.js";
import userReducer from "./user/slice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

// Persist config for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

// Configure the store with the persisted reducer and middleware
export const store = configureStore({
  reducer: {
    cart: persistReducer(persistConfig, cartReducer),
    wishlist: persistReducer(persistConfig, wishlistReducer),
    user: persistReducer(persistConfig, userReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Turn off serializable check for redux-persist
    }).concat(thunk),
});

// Create the persistor for persisting the store
export const persistor = persistStore(store);
