"use client";

import React from "react";
import { useState, useEffect } from "react";
import { CoinLineChart } from "./CoinLineChart";
import { CoinBarChart } from "./CoinBarChart";
import ChartsIntervalButtons from "./ChartsIntervalButtons";
import { convertUnixToDate } from "./UnixTimeConverter";
import { CoinSwiper } from "./CoinSwiper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { priceChart } from "@/redux/charts/priceSlice";
import { timeInterval } from "@/redux/charts/timeSlice";
import {
  Chart as ChartJS,
  LogarithmicScale,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Colors,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LogarithmicScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  CategoryScale
);

export const ChartsMain = () => {
  const currency = useAppSelector((state) => state.currency);
  const [numberOfDays, setNumberOfDays] = useState("7");

  const combinedChartCoins = useAppSelector(
    (state) => state.chartCoins.chartCoins
  );

  const chartCoin1 = useAppSelector((state) => state.chartCoins.chartCoins2);
  const prices = useAppSelector((state) => state.chartCoins.chartCoins2.prices);
  const labels = useAppSelector((state) => state.chartCoins.labels);
  console.log(
    "chartcoins2",
    chartCoin1[0]?.prices,
    "combined",
    combinedChartCoins,
    prices
  );

  const options = {
    animation: {
      duration: 2000,
    },
    scales: {
      y: {
        display: false,
        type: "logarithmic",
      },
      x: {
        grid: {
          color: "transparent",
        },
        type: "time",
        time: {
          unit: "day",
        },
        ticks: {
          font: {
            size: 12,
          },
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
  };

  const data = {
    labels: combinedChartCoins[0]?.prices.map((item) => item.time),
    datasets: [
      {
        label: combinedChartCoins[0]?.coinName,
        data: combinedChartCoins[0]?.prices.map((item) => item.yData),
        borderColor: "rgb(255, 99, 2)",
        // backgroundColor: "rgba(255, 99, 0, 0.5)",
        borderRadius: "5",
        tension: 0.5,
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
      },
      {
        label: combinedChartCoins[1]?.coinName,
        data: combinedChartCoins[1]?.prices.map((item) => item.yData),
        borderColor: "rgb(255, 44, 132)",
        // backgroundColor: "rgba(0, 99, 132, 0.5)",
        borderRadius: "5",
        tension: 0.5,
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
      },
      {
        label: combinedChartCoins[2]?.coinName,
        data: combinedChartCoins[2]?.prices.map((item) => item.yData),
        borderColor: "rgb(44, 99, 132)",
        // backgroundColor: "rgba(255, 0, 132, 0.5)",
        borderRadius: "5",
        tension: 0.5,
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
      },
    ],
  };

  const dispatch = useAppDispatch();

  const handleClick = (coin) => {
    dispatch(
      priceChart({
        currency: currency.currency,
        coinId: coin.id,
        coinName: coin.name,
        days: numberOfDays,
      })
    );
  };

  useEffect(() => {
    dispatch(
      priceChart({
        currency: currency.currency,
        coinId: "bitcoin",
        coinName: "Bitcoin",
        days: numberOfDays,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      timeInterval({
        chartCoins: combinedChartCoins,
        currency: currency.currency,
        days: numberOfDays,
      })
    );
  }, [numberOfDays, currency]);

  function handleNumberOfDays(value) {
    setNumberOfDays(value);
  }

  const combinedDataPrices = combinedChartCoins[0]?.prices?.map(
    (item, index) => {
      if (combinedChartCoins.length === 1) {
        return {
          time: convertUnixToDate(item.time),
          price1: item.yData,
        };
      }

      if (combinedChartCoins.length === 2) {
        return {
          time: convertUnixToDate(item.time),
          price1: item.yData,
          price2: combinedChartCoins[1]?.prices[index]?.yData,
        };
      }
      if (combinedChartCoins.length === 3) {
        return {
          time: convertUnixToDate(item.time),
          price1: item.yData,
          price2: combinedChartCoins[1]?.prices[index]?.yData,
          price3: combinedChartCoins[2]?.prices[index]?.yData,
        };
      }
    }
  );

  const combinedDataVolume = combinedChartCoins[0]?.volume?.map(
    (item, index) => {
      if (combinedChartCoins.length === 1) {
        return {
          time: convertUnixToDate(item.time),
          volume1: item.yData,
        };
      }

      if (combinedChartCoins.length === 2) {
        return {
          time: convertUnixToDate(item.time),
          volume1: item.yData,
          volume2: combinedChartCoins[1]?.volume[index]?.yData,
        };
      }
      if (combinedChartCoins.length === 3) {
        return {
          time: convertUnixToDate(item.time),
          volume1: item.yData,
          volume2: combinedChartCoins[1]?.volume[index]?.yData,
          volume3: combinedChartCoins[2]?.volume[index]?.yData,
        };
      }
    }
  );

  return (
    <div className="flex flex-col justify-center items-center my-3">
      <div className="text-xs flex items-center justify-center w-full mt-2">
        Select currency to view statistics
      </div>
      <div>
        <CoinSwiper
          handleClick={handleClick}
          combinedChartCoins={combinedChartCoins}
        />
      </div>

      <div>
        <Line options={options} data={data} className="h-72  " />
      </div>

      <div className="flex mt-4">
        <div className="h-72 m-1 flex items-center justify-center bg-second">
          <CoinLineChart
            combinedDataPrices={combinedDataPrices}
            combinedChartCoins={combinedChartCoins}
          />
        </div>
        <div className="h-72 m-1 flex items-center justify-center bg-second">
          <CoinBarChart
            graphData={combinedDataVolume}
            combinedChartCoins={combinedChartCoins}
          />
        </div>
      </div>
      <div>
        <ChartsIntervalButtons
          handleNumberOfDays={handleNumberOfDays}
          numberOfDays={numberOfDays}
        />
      </div>
    </div>
  );
};

export default ChartsMain;
