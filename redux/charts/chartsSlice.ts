import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Coin } from "@/app/sharedinterfaces";
import { useGetChartInfoQuery } from "@/app/Providers/api/apiSlice";

interface ChartCoinsState {
  value: any;
  chartCoins: chartCoins[];
}

const initialState: ChartCoinsState = {
  chartCoins: [],
  value: "",
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
    removeChartCoin: (state, action: any) => {
      state.chartCoins = state.chartCoins.filter(
        (c) => c.id !== action.payload.id
      );
    },
  },
});

export const { addChartCoin, removeChartCoin } = chartCoinsSlice.actions;

export default chartCoinsSlice.reducer;
