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
import { time } from "console";

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

  console.log(
    "redux chart",
    combinedChartCoins,
    "chartCoins",
    chartCoins,
    "coininput",
    coinInput
  );
  // const {
  //   inputCoin1,
  //   inputCoins,
  //   // chartCoins,
  //   // getChartInfo,
  //   handleTime,
  //   handleNumberOfDays,
  // } = useCrypto();

  const combinedDataPrices = combinedChartCoins[0]?.prices?.map(
    (item, index) => {
      if (combinedChartCoins.length === 1) {
        return {
          time: item.time,
          price1: item.yData,
        };
      }

      if (combinedChartCoins.length === 2) {
        return {
          time: item.time,
          price1: item.yData,
          price2: combinedChartCoins[1]?.prices[index].yData,
        };
      }
      if (combinedChartCoins.length === 3) {
        return {
          time: item.time,
          price1: item.yData,
          price2: combinedChartCoins[1]?.prices[index].yData,
          price3: combinedChartCoins[2]?.prices[index].yData,
        };
      }
    }
  );

  const combinedDataVolume = combinedChartCoins[0]?.volume?.map(
    (item, index) => {
      if (combinedChartCoins.length === 1) {
        return {
          time: item.time,
          volume1: item.yData,
        };
      }

      if (combinedChartCoins.length === 2) {
        return {
          time: item.time,
          volume1: item.yData,
          volume2: combinedChartCoins[1]?.volume[index].yData,
        };
      }
      if (combinedChartCoins.length === 3) {
        return {
          time: item.time,
          volume1: item.yData,
          volume2: combinedChartCoins[1]?.volume[index].yData,
          volume3: combinedChartCoins[2]?.volume[index].yData,
        };
      }
    }
  );

  // const fixIntervalPrices = every_nth(combinedChartCoins, 30);
  // const mapGraphData = (item) => {
  //   return { time: item[0], v: item[1] };
  // };
  // const graphDataV1 = chartCoins?.total_volumes?.map(mapGraphData);
  // const graphDataV2 = chartCoins?.total_volumes?.map(mapGraphData);
  // const graphDataV3 = chartCoins?.total_volumes?.map(mapGraphData);

  // const combinedDataVolumes = graphDataV1?.map((item, index) => {
  //   return {
  //     time: item.time,
  //     v1: item.v,
  //     v2: graphDataV2[index]?.v,
  //     v3: graphDataV3[index]?.v,
  //   };
  // });

  // const fixIntervalVol = every_nth(combinedChartCoins, 10);
  //
  //{" "}
  return (
    <>
      <div className="flex flex-col my-12">
        <div></div>
        <div></div>
        <div>
          <CoinSwiper handleClick={handleClick} />
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
