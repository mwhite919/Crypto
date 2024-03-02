import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "./portfolio/portfolioSlice";
import { coinGeckoApi } from "@/app/Providers/api/apiSlice";
import priceChartSliceReducer from "./chartCoins/chartCoins";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [coinGeckoApi.reducerPath]: coinGeckoApi.reducer,
      portfolio: portfolioReducer,
      priceChartSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(coinGeckoApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
