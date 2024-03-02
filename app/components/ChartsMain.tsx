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
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { priceChart } from "@/redux/chartCoins/chartCoins";

export const ChartsMain = () => {
  const {
    inputCoin1,
    inputCoins,
    currency,
    handleTime,
    numberOfDays,
    handleNumberOfDays,
  } = useCrypto();

  const [combined, setCombined] = useState([]);
  const { chartCoins } = useAppSelector(
    (state) => state.priceChartSliceReducer
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(priceChart({ currency: "usd", coinId: "bitcoin", days: "7" }));
  }, []);

  useEffect(() => {
    console.log("dataforcoins", chartCoins);
  }, [chartCoins]);

  const mapGraphDataPrices = (item) => {
    return { time: item[0], price: item[1] };
  };

  const graphDataPrices = chartCoins?.prices?.map(mapGraphDataPrices);

  const fixIntervalPrices = every_nth(graphDataPrices, 30);

  console.log(graphDataPrices);

  const mapGraphData = (item) => {
    return { time: item[0], v: item[1] };
  };
  const graphDataV = chartCoins?.total_volumes?.map(mapGraphData);

  const fixIntervalVol = every_nth(graphDataV, 10);

  return (
    <>
      <div className="flex  flex-col my-12">
        <div className="flex">
          <div>
            <CoinLineChart graphDataPrices={graphDataPrices} />
          </div>
          <div>
            <CoinBarChart graphData={fixIntervalVol} />
          </div>
        </div>
        <div>
          <ChartsIntervalButtons />
        </div>
      </div>
    </>
  );
};

export default ChartsMain;
