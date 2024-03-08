"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useCrypto } from "@/app/Providers/CryptoProvider";
import { CoinLineChart } from "./CoinLineChart";
import { CoinBarChart } from "./CoinBarChart";
import { every_nth } from "./Every_nth";
import ChartsIntervalButtons from "./ChartsIntervalButtons";
import { convertUnixToDate } from "./UnixTimeConverter";
import { CoinSwiper } from "./CoinSwiper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { priceChart } from "@/redux/charts/priceSlice";
import { timeInterval } from "@/redux/charts/timeSlice";

export const ChartsMain = () => {
  const currency = useAppSelector((state) => state.currency);
  const [numberOfDays, setNumberOfDays] = useState("7");

  const combinedChartCoins = useAppSelector(
    (state) => state.chartCoins.chartCoins
  );

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
  }, [numberOfDays]);

  useEffect(() => {
    dispatch(
      timeInterval({
        chartCoins: combinedChartCoins,
        currency: currency.currency,
        coinId: "bitcoin",
        coinName: "Bitcoin",
        days: numberOfDays,
      })
    );
  }, [numberOfDays]);

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
    <>
      <div className="flex flex-col my-12">
        <div></div>
        <div></div>
        <div>
          <CoinSwiper
            handleClick={handleClick}
            combinedChartCoins={combinedChartCoins}
          />
        </div>
        <div>
          These coins:{" "}
          {combinedChartCoins?.map((c) => {
            return <div key={c?.coinName}>{c?.coinName}</div>;
          })}
        </div>
        <div className="flex">
          <CoinLineChart combinedDataPrices={combinedDataPrices} />
          <CoinBarChart graphData={combinedDataVolume} />
        </div>
        <div>
          <ChartsIntervalButtons
            handleNumberOfDays={handleNumberOfDays}
            numberOfDays={numberOfDays}
          />
        </div>
      </div>
    </>
  );
};

export default ChartsMain;
