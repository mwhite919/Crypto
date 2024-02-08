import { configureStore } from "@reduxjs/toolkit";
import coinsListReducer from '.redux/coinsList/coinsListReducer'

export default configureStore({
  reducer: {
    coinList: coinsListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
