"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useCrypto } from "@/app/Providers/CryptoProvider";
import { CoinLineChart } from "./CoinLineChart";
import { CoinBarChart } from "./CoinBarChart";
import { every_nth } from "./Every_nth";
import ChartsIntervalButtons from "./ChartsIntervalButtons";
import { convertUnixToDate } from "./UnixTimeConverter";

export const ChartsMain = () => {
  const [combined, setCombined] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    inputCoin1,
    inputCoins,
    currency,
    chartCoins,
    getChartInfo,
    handleTime,
    numberOfDays,
    handleNumberOfDays,
  } = useCrypto();

  const graphDataPricesC1 = chartCoins[0]?.prices?.map((item) => {
    return { time: item[0] / 1000, price: item[1] };
  });

  const graphDataPricesC2 = chartCoins[1]?.prices?.map((item) => {
    return { price: item[1] };
  });

  const graphDataPricesC3 = chartCoins[2]?.prices?.map((item) => {
    return { price: item[1] };
  });

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

  const graphDataV1 = chartCoins?.total_volumes?.map((item) => {
    return { time: item[0], v: item[1] };
  });

  const graphDataV2 = chartCoins?.total_volumes?.map((item) => {
    return { time: item[0], v: item[1] };
  });

  const graphDataV3 = chartCoins?.total_volumes?.map((item) => {
    return { time: item[0], v: item[1] };
  });

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
