'use client'

import React from 'react'


import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Coin } from "@/app/sharedinterfaces";

interface PortfolioState {
  value: any;
  coins: Coin[];
}

const initialState: PortfolioState = {
  currency: 'usd'
  symbol: '$'
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
    reducers: {
        changeCurrency: (state, action: any) => {
            state.currency = action.payload
            state.symbol = action.payload.symbol,
        }
    }
});

export const { changeCurrency } = currencySlice.actions;

export default currencySlice