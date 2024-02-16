import { createSlice, nanoid } from "@reduxjs/toolkit";

interface PortfolioState {
  value: any;
}

const initialState: PortfolioState = {
  coins: [],
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
