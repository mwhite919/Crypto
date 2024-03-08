"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mapGraphData } from "@/app/components/MapGraphData";

interface ChartCoinsState {
  value: any;
  chartCoins: chartCoins[];
}

const initialState: ChartCoinsState = {
  chartCoins: [],
  prices: [],
  volume: [],
};

const chartCoinsSlice = createSlice({
  name: "chartCoins",
  initialState,
  reducers: {
    addChartCoin: (state, action: any) => {
      if (state.chartCoins.length < 1) {
        const chartCoin = {
          id: action.payload.id,
          coinName: action.payload.coinName,
          time: action.payload.time,
          prices: action.payload.prices.map(mapGraphData),
          volume: action.payload.volume.map(mapGraphData),
        };
        state.chartCoins.push(chartCoin);
        return;
      }
      if (state.chartCoins.find((c) => c.id === action.payload.id)) {
        if (state.chartCoins.length === 1) return;
        state.chartCoins = state.chartCoins.filter(
          (c) => c.id !== action.payload.id
        );
      } else {
        if (state.chartCoins.length >= 3) {
          return state;
        }
        const chartCoin = {
          id: action.payload.id,
          coinName: action.payload.coinName,
          time: action.payload.time,
          prices: action.payload.prices.map(mapGraphData),
          volume: action.payload.volume.map(mapGraphData),
        };
        state.chartCoins.push(chartCoin);
        {
        }
      }
    },
  },
});

export const { addChartCoin } = chartCoinsSlice.actions;

export default chartCoinsSlice.reducer;
