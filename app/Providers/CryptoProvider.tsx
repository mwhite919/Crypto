"use client";
import { useState, createContext, useContext } from "react";

import axios from "axios";

export const CryptoContext = createContext();

export function useCrypto() {
  const value = useContext(CryptoContext);
  return value;
}

export default function CryptoProvider({ children }) {
  const [currentCoins, setCurrentCoins] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [barData, setBarData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sortValue, setSortValue] = useState("volume_desc");
  const [inputCoin1, setInputCoin1] = useState("bitcoin");
  const [inputCoin2, setInputCoin2] = useState("ethereum");
  const [inputCoin3, setInputCoin3] = useState("ethereum");

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

  function handleCurrency(e: string) {
    setCurrency(e.target.value);
  }

  function handleSort(e: string) {
    setSortValue(e.target.value);
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
        inputCoin2,
        inputCoin3,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}
