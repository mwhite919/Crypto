"use client";

import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  currency: string;
  symbol: string;
  name: string;
}

const initialState = {
  currency: "usd",
  symbol: "$",
  name: "United States Dollar",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurr: (state, action) => {
      state.currency = action.payload.currency;
      state.symbol = action.payload.symbol;
      state.name = action.payload.name;
    },
  },
});

export const { changeCurr } = currencySlice.actions;
export default currencySlice.reducer;
