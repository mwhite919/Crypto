"use client";
import { useState, createContext, useContext } from "react";
import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const CryptoContext = createContext();

export function useCrypto() {
  const value = useContext(CryptoContext);
  return value;
}

//https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortValue}&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27
export const coinsApiProvider = createApi({
  baseQuery: () => {},
  endpoints: (build) => ({
    coinsList: build.query({
      async queryFn() {
        await simulateLoading();
        return { data: coinListData };
      },
    }),
    coinDetail: build.query({
      async queryFn() {
        await simulateLoading();
        return { data: coinDetailData };
      },
    }),
  }),
});

export default function CryptoProvider({ children }) {
  const [currentCoins, setCurrentCoins] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [barData, setBarData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sortValue, setSortValue] = useState("volume_desc");
  const [chartCoins, setChartCoins] = useState([]);
  const [inputCoin1, setInputCoin1] = useState({});
  const [numberOfDays, setNumberOfDays] = useState("7");
  const top10Coins = Object.values(currentCoins).slice(0, 10);

  const getCoins = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortValue}&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27`
      );
      setCurrentCoins(data);
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  };

  const getBarInfo = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(`https://api.coingecko.com/api/v3/global`);
      setBarData(data);
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  };

  const getChartInfo = async (input) => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${input.id}/market_chart?vs_currency=${currency}&days=${numberOfDays}&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27`
      );
      const selectedCoin = {
        name: input.name,
        prices: data.prices,
        volume: data.total_volumes,
      };
      setChartCoins([...chartCoins, selectedCoin]);
    } catch (err) {
      console.log("charterror", err);
      setError(true);
      setIsLoading(false);
    }
  };

  function handleTime(value: string) {
    setNumberOfDays(value);
  }

  function handleCurrency(e: string) {
    setCurrency(e.target.value);
  }

  function handleSort(e: string) {
    setSortValue(e.target.value);
  }

  const handleSelect = (coin) => {
    if (chartCoins.includes(coin)) {
      const removed = chartCoins.filter((e) => e !== coin);
      if (chartCoins.length === 1) return;
      setChartCoins(removed);
      return;
    }
    if (chartCoins.length === 3) return;
    getChartInfo(coin);
    setChartCoins([...chartCoins, coin]);
  };

  function handleNumberOfDays(e: string) {
    setNumberOfDays(e.target.value);
  }

  return (
    <CryptoContext.Provider
      value={{
        getCoins,
        currentCoins,
        currency,
        handleCurrency,
        currencySymbol,
        getBarInfo,
        barData,
        handleSort,
        inputCoin1,
        handleSelect,
        top10Coins,
        chartCoins,
        getChartInfo,
        handleTime,
        numberOfDays,
        handleNumberOfDays,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}
