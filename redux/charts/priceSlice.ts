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
        yData: json.prices,
      })
    );
  }
);
