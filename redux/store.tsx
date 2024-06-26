import { configureStore } from "@reduxjs/toolkit";
import chartCoinsReducer from "./charts/chartsSlice";
import { coinGeckoApi } from "@/app/Providers/api/apiSlice";
import currencySliceReducer from "./currency/currencySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
      chartCoins: chartCoinsReducer,
      currency: currencySliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(coinGeckoApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
