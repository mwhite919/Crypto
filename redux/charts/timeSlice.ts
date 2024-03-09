"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
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
          `${endpoint}${coin.id}/market_chart?vs_currency=${currency}&days=${days}&precision=3&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27`
        );
        const json = await data.json();
        return { id: coin.id, data: json };
      })
    ).then((newArr) => {
      thunkAPI.dispatch(updateAllCoins(newArr));
    });
  }
);
