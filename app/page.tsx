"use client";

import Navigation from "./Components/Navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import CoinRow from "./Components/CoinRow";
import LineChart from "./Components/LineChart";


export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentCoins, setCurrentCoins] = useState();
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [singleCoin, setSingleCoin] = useState();
  const [darkMode, setDarkMode] = useState(true);
  const [chartCoin, setChartCoin] = useState();
  const [barData, setBarData] = useState();


  const getCoins = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      );
      setCurrentCoins(data);
      console.log("data", data);
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  };

  function toggleDarkMode() {
    console.log("click", darkMode);
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }

  useEffect(() => {
    getCoins();
  }, []);

  const getChartInfo = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily`
      );
      setChartCoin(data);
      console.log("chartdata", data);
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getChartInfo();
  }, []);

  const theme = {
    dark: {
      primary: "black",
      text: "#fff",
    },
    light: {
      primary: "#fff",
      text: "#000",
    },
  };

  return (
    
      <div>
        <div>{isLoading && <h2>fetching data...</h2>}</div>
        <div>{error && <h2>page loading</h2>}</div>

        <div>
          <LineChart />
        </div>

        <div>
          {currentCoins?.map((coin, index, currency) => (
            <div key={coin.id}>
              <CoinRow coin={coin} index={index + 1} currency={currency} />
            </div>
          ))}
        </div>
      </div>
    
  );
}
