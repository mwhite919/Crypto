"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCrypto } from "@/app/Providers/CryptoProvider";
import { CoinLineChart } from "./CoinLineChart";
import { CoinBarChart } from "./CoinBarChart";
import { RadioGroup } from "@headlessui/react";
import { convertUnixToDate } from "./UnixTimeConverter";
import { every_nth } from "./Every_nth";
import { time } from "console";

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
    handleNumberOfDays
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

  console.log("chartccoins", chartCoins, "inputcoins", inputCoins);

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
  }, [ chartCoins, inputCoin1, combinedDataPrices]);

  return (
    <>
      <div className="flex my-12">
        <div>
          {chartCoins.map((coin) => {
            <h1>{coin.name}</h1>;
          })}

          <CoinLineChart
            combinedDataPrices={fixIntervalPrices}
            interval="preserveStartEnd"
          />
        </div>
        <div>
          <CoinBarChart graphData={fixIntervalVol} />
        </div>
      </div>
      <div>
        <RadioGroup
          className="flex items-center justify-center my-5"
          value={numberOfDays}
          onChange={handleNumberOfDays}
        >
          <RadioGroup.Option
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                  : ""
              }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 m-1 shadow-md focus:outline-none`
            }
            value="1"
          >
            {({ checked }) => <span>1D</span>}
          </RadioGroup.Option>
          <RadioGroup.Option
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                  : ""
              }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md m-1 focus:outline-none`
            }
            value="7"
          >
            {({ checked }) => <span>7D</span>}
          </RadioGroup.Option>
          <RadioGroup.Option
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                  : ""
              }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md m-1 focus:outline-none`
            }
            value="14"
          >
            {({ checked }) => <span>14D</span>}
          </RadioGroup.Option>
          <RadioGroup.Option
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                  : ""
              }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md m-1 focus:outline-none`
            }
            value="90"
          >
            {({ checked }) => <span>3M</span>}
          </RadioGroup.Option>
          <RadioGroup.Option
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                  : ""
              }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md m-1 focus:outline-none`
            }
            value="180"
          >
            {({ checked }) => <span>6M</span>}
          </RadioGroup.Option>
          <RadioGroup.Option
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                  : ""
              }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md m-1 focus:outline-none`
            }
            value="365"
          >
            {({ checked }) => <span>1Y</span>}
          </RadioGroup.Option>
          <RadioGroup.Option
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                  : ""
              }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md m-1 focus:outline-none`
            }
            value="1825"
          >
            {({ checked }) => <span>5Y</span>}
          </RadioGroup.Option>
        </RadioGroup>
      </div>
    </>
  );
};

export default ChartsMain;
