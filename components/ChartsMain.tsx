"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { CoinLineChart } from "./CoinLineChart";
import { CoinBarChart } from "./CoinBarChart";
import { RadioGroup } from "@headlessui/react";

export const ChartsMain = () => {
  const [chartCoin, setChartCoin] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState("1");

  const getChartInfo = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${numberOfDays}&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27`
      );
      setChartCoin(data);
      console.log("chartdata", data);

      setIsLoading(false);
    } catch (err) {
      console.log("michelle", err);
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getChartInfo();
  }, [numberOfDays]);

  function handleTime(value: string) {
    setNumberOfDays(value);
    console.log(numberOfDays, "numberofdays");
  }

  const graphDataPrices = chartCoin?.prices?.map((item) => {
    return { time: item[0], price: item[1] };
  });

  const everyThird =graphDataPrices?.filter((_,i) => i % 10 == 0)

  const graphDataV = chartCoin?.total_volumes?.map((item) => {
    return { time: item[0], price: item[1] };
  });

  const everyThirdV =graphDataV?.filter((_,i) => i %  10 == 0)

  return (
    <>
      <div className="flex my-12">
        <div>
          <CoinLineChart
            graphData={everyThird}
            interval="preserveStartEnd"
          />
        </div>
        <div>
          <CoinBarChart graphData={everyThirdV} />
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
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
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
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
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
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
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
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
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
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
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
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
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
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
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
