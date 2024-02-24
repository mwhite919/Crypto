import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coinGecko = createApi({
  reducerPath: "coinGeckoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/" }),
  endpoints: (builder) => ({
    getAllCoins: builder.query({
      query: () => "coins",
    }),
  }),
});

//https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortValue}&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCoins } = coinGecko;
