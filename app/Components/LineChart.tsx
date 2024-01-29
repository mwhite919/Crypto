'use client'

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


const LineChart = () => {

const [chartCoin, setChartCoin] = useState({})
const [error, setError] = useState(false);
const [isLoading, setIsLoading] = useState(false);

  
  const getChartInfo = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily`
      );
      setChartCoin(data);
      console.log("chartdata", data);
      console.log("here",chartCoin)
      setIsLoading(false);
    } catch (err) {
      console.log("michelle",err)
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getChartInfo();
  }, []);


  const prices = chartCoin;
  // const priceData = prices?.map((x) => x[1]);
  // const yAxis = prices?.map((x) => x[0]);

  // const data = {
  //   labels: priceData,
  //   datasets: [{ label: "side", x: yAxis, y: priceData}],
  // };

console.log("chartcoin", chartCoin, "error", error, )



  return (
    <div className="flex">
      <div className="m-10 h-64 w-96 bg-purple-600">
        <canvas id="myChart" width="800" height="400">
          
        </canvas>
      </div>
      <div className="m-10 h-64 w-96 bg-purple-600"></div>
    </div>
  );
};

export default LineChart;
