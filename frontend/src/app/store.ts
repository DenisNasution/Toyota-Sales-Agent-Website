import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import homeReducer from "../features/homeSlice";
import priceReducer from "../features/priceSlice";
import testimoniReducer from "../features/testimoniSlice";
import vehicleReducer from "../features/vehicleSlice";
import subVehicleReducer from "../features/subVehicleSlice";
import bannerReducer from "../features/bannerSlice";
import userReducer from "../features/userSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  // safelist: ["auth"],
};
const rootReducer = combineReducers({
  home: homeReducer,
  price: priceReducer,
  testimoni: testimoniReducer,
  vehicle: vehicleReducer,
  subVehicle: subVehicleReducer,
  banner: bannerReducer,
  user: userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // devTools: true,
});
// export const store = configureStore({
//   reducer: {

//   },
// });

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
