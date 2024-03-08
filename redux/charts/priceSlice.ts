"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addChartCoin } from "@/redux/charts/chartsSlice";

export const priceChart = createAsyncThunk(
  "priceChart",
  async (
    {
      currency,
      coinId,
      days,
    }: { currency: string; coinId: string; days: string },
    thunkAPI
  ) => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`;
    const response = await fetch(url);
    const json = await response.json();
    thunkAPI.dispatch(
      addChartCoin({
        id: coinId,
        coinName: coinId,
        time: "8",
        prices: json.price,
        volume: json.total_volumes,
      })
    );
  }
);

const initialState = {
  //   days: "180",
  //   volume: [],
  //   // coinInfo: [],
  //   // labelsTwo: [],
  //   // labels: [],
  //   prices: [],
  // loading: false,
  // error: ''
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
        // state.loading = false;
        // state.coinInfo = action.payload;
        // const { prices, total_volume } = action.payload;
        // state.volume = prices.map((arr: [number, number]) => arr[0]);
        // state.prices = prices.map((arr: [number, number]) => arr[1]);
        // // state.labelsTwo = market_caps.map((arr: [number, number]) => arr[0]);
        // // state.market_caps = market_caps.map((arr: [number, number]) => arr[1]);
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
