"use client";

import { useAppSelector } from "../hooks";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateAllCoins } from "./chartsSlice";

export const timeInterval = createAsyncThunk(
  "timeInterval",
  async (
    {
      chartCoins,
      currency,
      days,
    }: {
      chartCoins: any[];
      currency: string;
      days: string;
    },
    thunkAPI
  ) => {
    const endpoint = "https://api.coingecko.com/api/v3/coins/";
    const newArr = Promise.all(
      chartCoins?.map(async (coin) => {
        const data = await fetch(
          `${endpoint}${coin.id}/market_chart?vs_currency=${currency}&days=${days}&precision=3`
        );
        const json = await data.json();
        return { id: coin.id, data: json };
      })
    ).then((newArr, json) => {
      console.log(newArr, json);
      thunkAPI.dispatch(updateAllCoins(newArr));
    });
  }
);

const initialState = {
  chartCoins: [],
  currency: "usd",
  numberOfDays: 7,
};

// const timeIntervalSlice = createSlice({
//   name: "timeInterval",
//   initialState,
//   reducers: {
//     changeTimeInterval: (state, action) => {
//     chartCoins.
//     },
//     setPrices: (state, action) => {
//       state.prices = action.payload;
//     },
//     setVolume: (state, action) => {
//       state.total_volume = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(priceChart.pending, (state, action) => {
//         state.loading = true;
//         state.error = "";
//       })
//       .addCase(priceChart.fulfilled, (state, action) => {
//         state.chartCoins = action.payload;
//       })
//       .addCase(priceChart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? "An unkown error occurrfetchData";
//       });
//   },
// // });

// // export const { setDays, setVolume, setPrices } = priceChartSlice.actions;
// export default timeIntervalSlice.reducer;
