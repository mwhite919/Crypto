"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useCrypto } from "@/app/Providers/CryptoProvider";
import { CoinLineChart } from "./CoinLineChart";
import { CoinBarChart } from "./CoinBarChart";
import { every_nth } from "./Every_nth";
import ChartsIntervalButtons from "./ChartsIntervalButtons";
import { convertUnixToDate } from "./UnixTimeConverter";
import { useDispatch, useSelector } from "react-redux";
import { useGetChartInfoQuery } from "../Providers/api/apiSlice";

export const ChartsMain = () => {
  // const coinsForChart = useSelector((state) => chartCoins.coins);
  const dispatch = useDispatch();
  const {
    data: chartCoinsData,
    error,
    isError,
    isLoading,
  } = useGetChartInfoQuery({
    inputId: "bitcoin",
    currency: "usd",
    numberOfDays: "76",
  });

  console.log("dataforcoins", chartCoinsData);
  // console.log("chartcoins", coinsForChart);
  return;

  const {
    inputCoin1,
    inputCoins,
    currency,
    getChartInfo,
    handleTime,
    numberOfDays,
    handleNumberOfDays,
  } = useCrypto();

  const mapGraphDataPrices = (item) => {
    return { time: item[0], price: item[1] };
  };

  const graphDataPricesC1 = chartCoins?.prices?.map(mapGraphDataPrices);
  const graphDataPricesC2 = chartCoins?.prices?.map(mapGraphDataPrices);
  const graphDataPricesC3 = chartCoins?.prices?.map(mapGraphDataPrices);

  const combinedDataPrices = graphDataPricesC1?.map((item, index) => {
    if (chartCoins.length === 1) {
      return graphDataPricesC1;
    }
    if (chartCoins.length === 2) {
      return {
        time: item.time,
        price1: item.price,
        price2: graphDataPricesC2[index]?.price,
      };
    }
    if (chartCoins.length === 3) {
      return {
        time: item.time,
        price1: item.price,
        price2: graphDataPricesC2[index]?.price,
        price3: graphDataPricesC3[index]?.price,
      };
    }
  });

  const fixIntervalPrices = every_nth(combinedDataPrices, 30);
  const mapGraphData = (item) => {
    return { time: item[0], v: item[1] };
  };
  const graphDataV1 = chartCoins?.total_volumes?.map(mapGraphData);
  const graphDataV2 = chartCoins?.total_volumes?.map(mapGraphData);
  const graphDataV3 = chartCoins?.total_volumes?.map(mapGraphData);

  const combinedDataVolumes = graphDataV1?.map((item, index) => {
    return {
      time: item.time,
      v1: item.v,
      v2: graphDataV2[index]?.v,
      v3: graphDataV3[index]?.v,
    };
  });

  const fixIntervalVol = every_nth(combinedDataVolumes, 10);

  useEffect(() => {
    getChartInfo(inputCoin1);
  }, [chartCoins, inputCoin1, combinedDataPrices]);

  return (
    <>
      <div className="flex my-12">
        <div>
          {chartCoins.map((coin) => {
            <h1 key={coin.name}>{coin.name}</h1>;
          })}
          <CoinLineChart combinedDataPrices={fixIntervalPrices} />
        </div>
        <div>
          <CoinBarChart graphData={fixIntervalVol} />
        </div>
        <div>
          <ChartsIntervalButtons />
        </div>
      </div>
    </>
  );
};

export default ChartsMain;
