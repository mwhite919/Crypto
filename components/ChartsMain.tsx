"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line } from "recharts";

export const ChartsMain = () => {
  const [chartCoin, setChartCoin] = useState({});


  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getChartInfo = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27`
      );
      setChartCoin(data);
      console.log("chartdata", data);
      
      setIsLoading(false);
    } catch (err) {
      console.log("michelle", err);
      setError(true);
      setIsLoading(false);
    }
  };




  return (
    <div className="flex">
    
      
      <div className="m-10 h-64 w-96 bg-purple-600"></div>
      <div className="m-10 h-64 w-96 bg-purple-600"></div>
    </div>
  );
};

export default ChartsMain;
