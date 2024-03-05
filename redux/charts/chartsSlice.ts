"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const chartDataAsync = createAsyncThunk(
  "fetchChartData",
  async (
    {
      coinId,
      currency,
      days,
    }: { currency: string; coinId: string; days: string },
    _thunkAPI
  ) => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
);

interface ChartCoinsState {
  value: any;
  chartCoins: chartCoin[];
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
  extraReducers: (builder) =>
    builder
      .addCase(chartDataAsync.pending, (state) => {
        state.chartCoins.status = "loading";
      })
      .addCase(chartDataAsync.fulfilled, (state, action) => {
        state.chartCoins.status = "complete";
        state.chartCoins.prices = action.payload.prices;
        state.chartCoins.volume = action.payload.total_volume;
      }),
});

export const { addChartCoin } = chartCoinsSlice.actions;

export default chartCoinsSlice.reducer;
