import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Coin } from "@/app/sharedinterfaces";

interface PortfolioState {
  value: any;
  coins: Coin[];
}

const initialState: PortfolioState = {
  coins: [],
  value: "",
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addCoin: (state, action: any) => {
      const coin = {
        id: action.payload.id,
        coin: action.payload.coin,
        amount: action.payload.amount,
        purchasePrice: action.payload.purchasePrice,
        date: action.payload.date,
      };
      state.coins.push(coin);
    },
    removeCoin: (state, action: any) => {
      state.coins = state.coins.filter((c) => c.id !== action.payload.id);
    },
  },
});

export const { addCoin, removeCoin } = portfolioSlice.actions;

export default portfolioSlice.reducer;
