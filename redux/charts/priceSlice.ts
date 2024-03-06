"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addChartCoin } from "@/redux/charts/chartsSlice";

export const priceChart = createAsyncThunk(
  "priceChart",
  async (
    {
      coinId,
      coinName,
      currency,
      days,
    }: { coinId: string; coinName: string; currency: string; days: string },
    thunkAPI
  ) => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27`;
    const response = await fetch(url);
    const json = await response.json();
    thunkAPI.dispatch(
      addChartCoin({
        id: coinId,
        coinName: coinName,
        time: days,
        prices: json.prices,
        volume: json.total_volumes,
      })
    );
  }
);

const initialState = {
  chartCoins: [],
};

const priceChartSlice = createSlice({
  name: "priceChart",
  initialState,
  reducers: {
    setDays: (state, action) => {
      state.days = action.payload;
    },
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setVolume: (state, action) => {
      state.total_volume = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(priceChart.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(priceChart.fulfilled, (state, action) => {
        state.chartCoins = action.payload;
      })
      .addCase(priceChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unkown error occurrfetchData";
      });
  },
});

export const { setDays, setVolume, setPrices } = priceChartSlice.actions;
export default priceChartSlice.reducer;
