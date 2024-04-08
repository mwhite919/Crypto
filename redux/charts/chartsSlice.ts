"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  mapGraphData,
  mapGraphData2,
  mapGraphDataTime,
} from "@/app/components/MapGraphData";
import { ChartCoin } from "@/app/sharedinterfaces";

interface ChartCoinsState {
  isLoading: boolean;
  chartCoins: ChartCoin[];
}

const initialState: ChartCoinsState = {
  chartCoins: [],
  isLoading: false,
};

const chartCoinsSlice = createSlice({
  name: "chartCoins",
  initialState,
  reducers: {
    addChartCoin: (
      state,
      action: PayloadAction<{
        id: string;
        coinName: string;
        time: string;
        prices: any;
        volume: any;
        yData: any;
      }>
    ) => {
      state.isLoading = true;
      if (state.chartCoins.length < 1) {
        const chartCoin = {
          id: action.payload.id,
          coinName: action.payload.coinName,
          time: action.payload.time,
          prices: action.payload.prices.map(mapGraphData),
          volume: action.payload.volume.map(mapGraphData),
          yData: action.payload.yData,
        };
        state.chartCoins.push(chartCoin);
        state.isLoading = false;
        return;
      }
      if (state.chartCoins.find((c) => c.id === action.payload.id)) {
        if (state.chartCoins.length === 1) {
          state.isLoading = false;
          return;
        }
        state.chartCoins = state.chartCoins.filter(
          (c) => c.id !== action.payload.id
        );
        state.isLoading = false;
      } else {
        if (state.chartCoins.length >= 3) {
          state.isLoading = false;
          return state;
        }
        const chartCoin = {
          id: action.payload.id,
          coinName: action.payload.coinName,
          time: action.payload.time,
          prices: action.payload.prices.map(mapGraphData),
          volume: action.payload.volume.map(mapGraphData),
          yData: action.payload.yData,
        };
        state.chartCoins.push(chartCoin);
        state.isLoading = false;
      }
    },
    updateAllCoins: (state, action: any) => {
      state.isLoading = true;
      state.chartCoins.map((chartCoin, index) => {
        chartCoin.id = chartCoin.id;
        chartCoin.coinName = chartCoin.coinName;
        chartCoin.time = chartCoin.time;
        chartCoin.prices = action.payload[index].data.prices?.map(mapGraphData);
        chartCoin.volume = action.payload[index].data.total_volumes?.map(
          mapGraphData
        );
      });
      state.isLoading = false;
    },
  },
});

export const { addChartCoin, updateAllCoins } = chartCoinsSlice.actions;

export default chartCoinsSlice.reducer;
