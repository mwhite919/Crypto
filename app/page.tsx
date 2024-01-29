"use client";

import Navigation from "./Components/Navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import CoinRow from "./Components/CoinRow";
import LineChart from "./Components/LineChart";
import Converter from "./Components/Converter";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentCoins, setCurrentCoins] = useState();
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [coin1, setCoin1] = useState();
  const [darkMode, setDarkMode] = useState(true);
  const [chartCoin, setChartCoin] = useState();
  const [barData, setBarData] = useState();
  const [calculator, setCalculator] = useState(false);

  const getCoins = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27`
      );
      setCurrentCoins(data);
      console.log("data", data);
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <div>
      <div>{isLoading && <h2>fetching data...</h2>}</div>
      <div>{error && <h2>page loading</h2>}</div>
      <div className="flex">
        {" "}
        <div
          onClick={() => setCalculator(false)}
          className="border-black bg-gray-300 w-16 m-5"
        >
          Coins
        </div>
        <div
          onClick={() => setCalculator(true)}
          className="border-black bg-gray-300 w-18 m-5"
        >
          Converter
        </div>
      </div>

      {calculator ? (
        <Converter currentCoins={currentCoins} />
      ) : (
        <div>
          <LineChart />
        </div>
      )}
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
