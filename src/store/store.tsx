import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userSliceReducer from "./dataSlice.js";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
  user: userSliceReducer,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSliceReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);
