"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mapGraphData } from "@/app/components/MapGraphData";

interface ChartCoinsState {
  value: any;
  chartCoins: chartCoins[];
}

const initialState: ChartCoinsState = {
  chartCoins: [],
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
    updateAllCoins: (state, action: any) => {
      state.chartCoins.map((chartCoin, index) => {
        chartCoin.id = chartCoin.id;
        chartCoin.coinName = chartCoin.coinName;
        chartCoin.time = chartCoin.time;
        chartCoin.prices = action.payload[index].data.prices.map(mapGraphData);
        chartCoin.volume = action.payload[index].data.total_volumes.map(
          mapGraphData
        );
      });
    },
  },
});

export const { addChartCoin, updateAllCoins } = chartCoinsSlice.actions;

export default chartCoinsSlice.reducer;
