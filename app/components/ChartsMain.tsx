"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useCrypto } from "@/app/Providers/CryptoProvider";
import { CoinLineChart } from "./CoinLineChart";
import { CoinBarChart } from "./CoinBarChart";
import { every_nth } from "./Every_nth";
import ChartsIntervalButtons from "./ChartsIntervalButtons";
import { convertUnixToDate } from "./UnixTimeConverter";
import { useGetChartInfoQuery } from "../Providers/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { CoinSwiper } from "./CoinSwiper";
import { addChartCoin } from "@/redux/charts/chartsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { priceChart } from "@/redux/charts/priceSlice";

export const ChartsMain = () => {
  const [currency, setCurrency] = useState("usd");
  const [coinInput, setCoinInput] = useState("bitcoin");
  const [numberOfDays, setNumberOfDays] = useState("7");

  const combinedChartCoins = useSelector(
    (state) => state.chartCoins.chartCoins
  );

  const { chartCoins } = useAppSelector((state) => state.priceChart);

  const dispatch = useAppDispatch();

  const handleClick = (coin) => {
    dispatch(
      priceChart({
        currency,
        coinId: coin.id,
        coinName: coin.name,
        days: numberOfDays,
      })
    );
  };

  useEffect(() => {
    console.log("useeffect");
    dispatch(
      priceChart({
        currency,
        coinId: "bitcoin",
        coinName: "Bitcoin",
        days: numberOfDays,
      })
    );
    console.log("afterUseEffect", combinedChartCoins);
  }, [numberOfDays]);

  const { handleTime, handleNumberOfDays } = useCrypto();

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
          volume2: combinedChartCoins[1]?.volume[index].yData,
        };
      }
      if (combinedChartCoins.length === 3) {
        return {
          time: convertUnixToDate(item.time),
          volume1: item.yData,
          volume2: combinedChartCoins[1]?.volume[index].yData,
          volume3: combinedChartCoins[2]?.volume[index].yData,
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
          {combinedChartCoins.map((c) => {
            return <div>{c.coinName}</div>;
          })}
        </div>
        <div className="flex">
          <CoinLineChart combinedDataPrices={combinedDataPrices} />
          <CoinBarChart graphData={combinedDataVolume} />
        </div>
        <div>
          <ChartsIntervalButtons />
        </div>
      </div>
    </>
  );
};

export default ChartsMain;
