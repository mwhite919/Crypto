"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ChartCoinsState {
  value: any;
  chartCoins: chartCoins[];
}

const initialState: ChartCoinsState = {
  chartCoins: [],
  status: "complete",
  prices: [],
  volume: [],
};

const chartCoinsSlice = createSlice({
  name: "chartCoins",
  initialState,
  reducers: {
    addChartCoin: (state, action: any) => {
      if (state.chartCoins.find((c) => c.id === action.payload.id)) {
        state.chartCoins = state.chartCoins.filter(
          (c) => c.id !== action.payload.id
        );
      } else {
        const chartCoin = {
          id: action.payload.id,
          coinName: action.payload.coinName,
          time: action.payload.time,
          prices: action.payload.prices,
          volume: action.payload.volume,
        };
        state.chartCoins.push(chartCoin);
      }
    },
  },
});

export const { addChartCoin } = chartCoinsSlice.actions;

export default chartCoinsSlice.reducer;
