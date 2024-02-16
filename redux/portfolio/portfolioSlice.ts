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
        id: nanoid,
        text: action.payload,
      };
      state.coins.push(coin);
    },
    removeCoin: (state, action: any) => {
      state.coins.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addCoin, removeCoin } = portfolioSlice.actions;

export default portfolioSlice.reducer;
