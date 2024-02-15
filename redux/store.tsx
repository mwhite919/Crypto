import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "./features/porfolioReducers";

export const makeStore = () => {
  return configureStore({
    reducer: {
      portfolio: portfolioReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
