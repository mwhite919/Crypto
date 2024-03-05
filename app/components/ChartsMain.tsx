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

  // const mapGraphDataPrices = (item) => {
  //   return { time: item[0], price: item[1] };
  // };

  // const graphDataPricesC1 = chartCoins[0]?.prices?.map(mapGraphDataPrices);
  // const graphDataPricesC2 = chartCoins?.prices?.map(mapGraphDataPrices);
  // const graphDataPricesC3 = chartCoins?.prices?.map(mapGraphDataPrices);

  // const combinedDataPrices = graphDataPricesC1?.map((item, index) => {
  //   if (chartCoins.length === 1) {
  //     return graphDataPricesC1;
  //   }
  //   if (chartCoins.length === 2) {
  //     return {
  //       time: item.time,
  //       price1: item.price,
  //       price2: graphDataPricesC2[index]?.price,
  //     };
  //   }
  //   if (chartCoins.length === 3) {
  //     return {
  //       time: item.time,
  //       price1: item.price,
  //       price2: graphDataPricesC2[index]?.price,
  //       price3: graphDataPricesC3[index]?.price,
  //     };
  //   }
  // // });

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

  //   <div>
  //   {/* {chartCoins.map((coin) => {
  //   <h1 key={coin.name}>{coin.name}</h1>;
  // })} */}
  //   <CoinLineChart combinedDataPrices={graphDataPricesC1} />
  // </div>
  // <div>
  //   <CoinBarChart graphData={fixIntervalVol} />
  // </div>

  return (
    <>
      <div className="flex flex-col my-12">
        <div>
          {combinedChartCoins.map((c) => {
            <div>{c.name}</div>;
          })}
        </div>
        <div>
          <CoinSwiper handleClick={handleClick} />
        </div>
        <div className="flex"></div>
        <div>
          <ChartsIntervalButtons />
        </div>
      </div>
    </>
  );
};

export default ChartsMain;
