"use client";

import { useAppSelector } from "../hooks";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const timeInterval = createAsyncThunk(
  "timeInterval",
  async (
    {
      chartCoins,
      coinId,
      coinName,
      currency,
      days,
    }: {
      chartCoins: any[];
      coinId: string;
      coinName: string;
      currency: string;
      days: string;
    },
    thunkAPI
  ) => {
    const endpoint = "https://api.coingecko.com/api/v3/coins/";
    Promise.all(
      chartCoins.map(async (coin) => {
        const data = await fetch(
          `${endpoint}${coin.coinId}/market_chart?vs_currency=usd&days=10&precision=3`
        );
        const json = await data.json();
        return json;
      })
    ).then((json) => {
      console.log("timedata", json);
      //   thunkAPI.dispatch(
      //     addChartCoin({
      //       id: coinId,
      //       coinName: coinName,
      //       time: days,
      //       prices: json.prices,
      //       volume: json.total_volumes,
      //     })
      //   );
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
