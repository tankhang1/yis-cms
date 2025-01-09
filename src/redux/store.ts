import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth/auth.api";
import appReducer from "./slices/appSlices";
import { iqrApi } from "./api/iqr/iqr.api";
import { brandnameApi } from "./api/brandname/brandname.api";
import { topupApi } from "./api/topup/topup.api";
import { rtkQueryErrorLogger } from "./middlewares/errorMiddleware";
import { setupListeners } from "@reduxjs/toolkit/query";
import { excelApi } from "./api/excel/excel.api";
import { dashboardApi } from "./api/dashboard/dashboard.api";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["app"],
};
const rootReducers = combineReducers({
  app: appReducer,
  [authApi.reducerPath]: authApi.reducer,
  [iqrApi.reducerPath]: iqrApi.reducer,
  [topupApi.reducerPath]: topupApi.reducer,
  [brandnameApi.reducerPath]: brandnameApi.reducer,
  [excelApi.reducerPath]: excelApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist actions
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
        ],
      },
    })
      .concat(authApi.middleware)
      .concat(iqrApi.middleware)
      .concat(brandnameApi.middleware)
      .concat(topupApi.middleware)
      .concat(excelApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(rtkQueryErrorLogger),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
