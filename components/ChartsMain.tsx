"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCrypto } from "@/app/Providers/CryptoProvider";
import { CoinLineChart } from "./CoinLineChart";
import { CoinBarChart } from "./CoinBarChart";
import { RadioGroup } from "@headlessui/react";
import { convertUnixToDate } from "./UnixTimeConverter";
import { time } from "console";

export const ChartsMain = () => {
  const [chartCoin1, setChartCoin1] = useState({});
  const [chartCoin2, setChartCoin2] = useState({});
  const [chartCoin3, setChartCoin3] = useState({});
  const [combined, setCombined] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState("1");

  const { inputCoin1, inputCoin2, currency, inputCoin3 } = useCrypto();

  const getChartInfo1 = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${inputCoin1}/market_chart?vs_currency=${currency}&days=${numberOfDays}&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27`
      );
      setChartCoin1(data);
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  };

  const getChartInfo2 = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${inputCoin2}/market_chart?vs_currency=${currency}&days=${numberOfDays}&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27`
      );
      setChartCoin2(data);
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  };

  const getChartInfo3 = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${inputCoin3}/market_chart?vs_currency=${currency}&days=${numberOfDays}&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27`
      );
      setChartCoin3(data);

      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  };



  useEffect(() => {
    getChartInfo1();
    getChartInfo2();
    getChartInfo3();
  }, [numberOfDays, inputCoin1, inputCoin2, inputCoin3]);

  function handleTime(value: string) {
    setNumberOfDays(value);
  }


  const graphDataPricesC1 = chartCoin1?.prices?.map((item) => {
    return { time: convertUnixToDate(item[0]), price: item[1] };
  });

  console.log("chartcoin", chartCoin1, chartCoin2, chartCoin3)
  console.log("graphdata", graphDataPricesC1)

  const graphDataPricesC2 = chartCoin2?.prices?.map((item) => {
    return { time: convertUnixToDate(item[0]), price: item[1] };
  });

  const graphDataPricesC3 = chartCoin3?.prices?.map((item) => {
    return { time: convertUnixToDate(item[0]), price: item[1] };
  });

  const graphDataV1 = chartCoin1?.total_volumes?.map((item) => {
    return { time: item[0], price: item[1] };
  });

  const graphDataV2 = chartCoin2?.total_volumes?.map((item) => {
    return { time: item[0], price: item[1] };
  });

  const graphDataV3 = chartCoin3?.total_volumes?.map((item) => {
    return { time: item[0], price: item[1] };
  });

  return (
    <>
      <div className="flex my-12">
        <div>
          <h1>{chartCoin1.name}</h1>
          <CoinLineChart
            graphData={graphDataPricesC1}
            interval="preserveStartEnd"
          />
        </div>
        <div>
          <CoinBarChart graphData={graphDataV1} />
        </div>
      </div>
      <div>
        <RadioGroup
          className="flex items-center justify-center my-5"
          value={numberOfDays}
          onChange={setNumberOfDays}
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
