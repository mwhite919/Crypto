"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coinGeckoApi = createApi({
  reducerPath: "coinGeckoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/" }),
  endpoints: (builder) => ({
    getAllCoins: builder.query({
      query: ({ currency, sortValue }) =>
        `/coins/markets?vs_currency=${currency}&order=${sortValue}&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27`,
    }),
    getSingleCoin: builder.query({
      query: (coin) =>
        `/coins/${coin}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`,
    }),
    getTopBarInfo: builder.query({
      query: () => "/global",
    }),
    getChartInfo: builder.query({
      query: ({ inputId, currency, numberOfDays }) =>
        `/${inputId}/market_chart?vs_currency=${currency}&days=${numberOfDays}&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27`,
    }),
  }),
});

export const {
  useGetAllCoinsQuery,
  useGetSingleCoinQuery,
  useGetTopBarInfoQuery,
  useGetChartInfoQuery,
} = coinGeckoApi;
