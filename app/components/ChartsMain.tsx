"use client";

import React from "react";
import { useState, useEffect } from "react";
import ChartsIntervalButtons from "./ChartsIntervalButtons";
import { CoinSwiper } from "./CoinSwiper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { priceChart } from "@/redux/charts/priceSlice";
import { timeInterval } from "@/redux/charts/timeSlice";
import {
  Chart as ChartJS,
  LogarithmicScale,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  Colors,
  BarElement,
  ChartOptions,
  ChartData,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line, Bar } from "react-chartjs-2";
import { graphStyling } from "../constants/graphStyling";
import { useCrypto } from "../Providers/CryptoProvider";
import { everyNth } from "./Every_nth";
import { convertUnixToDate } from "../utils/UnixTimeConverter";

ChartJS.register(
  LogarithmicScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  CategoryScale
);

type GraphStyle = keyof typeof graphStyling;

export const ChartsMain = () => {
  const combinedChartCoins = useAppSelector(
    (state) => state.chartCoins.chartCoins
  );

  const isLoading = useAppSelector((state) => state.chartCoins.isLoading);
  const currency = useAppSelector((state) => state.currency);
  const [numberOfDays, setNumberOfDays] = useState("7");
  const [displayLineData, setDisplayLineData] = useState("");
  const [dateToDisplay, setDateToDisplay] = useState("");
  const { palette, mode } = useCrypto();
  const colorsGroup = graphStyling[palette as GraphStyle];

  function units(num: string) {
    if (Number(num) == 1) {
      return "hour";
    }
    if (Number(num) >= 2) {
      return "day";
    }
    if (Number(num) >= 180) {
      return "week";
    }
  }

  const options: ChartOptions<"line"> = {
    animation: {
      duration: 2000,
    },
    maintainAspectRatio: false,
    interaction: { mode: "nearest" },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "start",
      },
      tooltip: {
        mode: "nearest",
        intersect: false,
        callbacks: {
          label: function (tooltipItem) {
            let label = tooltipItem.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (tooltipItem.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: currency.currency,
              }).format(tooltipItem.parsed.y);
            }
            setDisplayLineData(label);
            setDateToDisplay(convertUnixToDate(tooltipItem.parsed.x));
            return label;
          },
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      y: {
        display: false,
        type: "logarithmic",
      },
      x: {
        grid: {
          color: "transparent",
        },
        type: "time",
        time: {
          unit: units(numberOfDays),
        },
        ticks: {
          font: {
            size: 12,
          },
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
  };

  function pricesData(coinCount: number): ChartData<"line", any, unknown> {
    if (coinCount <= 1) {
      return {
        labels: everyNth(
          combinedChartCoins[0]?.prices.map(
            (item: { time: number }) => item.time
          ),
          numberOfDays
        ),
        datasets: [
          {
            label: combinedChartCoins[0]?.coinName,
            data: everyNth(
              combinedChartCoins[0]?.prices.map(
                (item: { yData: any }) => item.yData
              ),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin1.stopColor1,
            backgroundColor: (context: { chart: { ctx: any } }) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 350);
              gradient.addColorStop(
                0,
                colorsGroup?.coin1.stopColor1 || "rgba(255, 99, 2, 0.2)"
              );
              gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
              return gradient;
            },
            pointRadius: 0,
            borderWidth: 3,
            fill: true,
            tension: 0.5,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
          },
        ],
      };
    }

    if (coinCount === 2) {
      return {
        labels: everyNth(
          combinedChartCoins[0]?.prices.map(
            (item: { time: number }) => item.time
          ),
          numberOfDays
        ),
        datasets: [
          {
            label: combinedChartCoins[0]?.coinName,
            data: everyNth(
              combinedChartCoins[0]?.prices.map(
                (item: { yData: number }) => item.yData
              ),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin1.stopColor1,
            backgroundColor: (context: { chart: { ctx: any } }) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 350);
              gradient.addColorStop(
                0,
                colorsGroup?.coin1.stopColor1 || "rgba(255, 99, 2, 0.2)"
              );
              gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
              return gradient;
            },
            pointRadius: 0,
            borderWidth: 3,
            fill: true,
            tension: 0.5,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
          },
          {
            label: combinedChartCoins[1]?.coinName,
            data: everyNth(
              combinedChartCoins[1]?.prices.map(
                (item: { yData: number }) => item.yData
              ),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin2.stopColor1,
            backgroundColor: (context: { chart: { ctx: any } }) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 350);
              gradient.addColorStop(
                0,
                colorsGroup?.coin2.stopColor1 || "rgba(255, 99, 2, 0.2)"
              );
              gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
              return gradient;
            },
            pointRadius: 0,
            borderWidth: 3,
            fill: true,
            tension: 0.5,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
          },
        ],
      };
    }
    if (coinCount === 3) {
      return {
        labels: everyNth(
          combinedChartCoins[0]?.prices.map(
            (item: { time: number }) => item.time
          ),
          numberOfDays
        ),
        datasets: [
          {
            label: combinedChartCoins[0]?.coinName,
            data: everyNth(
              combinedChartCoins[0]?.prices.map(
                (item: { yData: number }) => item.yData
              ),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin1.stopColor1,
            backgroundColor: (context: { chart: { ctx: any } }) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 350);
              gradient.addColorStop(
                0,
                colorsGroup?.coin1.stopColor1 || "rgba(255, 99, 2, 0.2)"
              );
              gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
              return gradient;
            },
            pointRadius: 0,
            borderWidth: 3,
            fill: true,
            tension: 0.5,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
          },
          {
            label: combinedChartCoins[1]?.coinName,
            data: combinedChartCoins[1]?.prices.map(
              (item: { yData: number }) => item.yData
            ),
            borderColor: colorsGroup?.coin2.stopColor1,
            backgroundColor: (context: { chart: { ctx: any } }) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 350);
              gradient.addColorStop(
                0,
                colorsGroup?.coin2.stopColor1 || "rgba(255, 99, 2, 0.2)"
              );
              gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
              return gradient;
            },
            pointRadius: 0,
            borderWidth: 3,
            fill: true,
            tension: 0.5,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
          },
          {
            label: combinedChartCoins[2]?.coinName,
            data: everyNth(
              combinedChartCoins[2]?.prices.map(
                (item: { yData: number }) => item.yData
              ),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin3.stopColor1,
            backgroundColor: (context: { chart: { ctx: any } }) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 350);
              gradient.addColorStop(
                0,
                colorsGroup?.coin3.stopColor1 || "rgba(255, 99, 2, 0.2)"
              );
              gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
              return gradient;
            },
            pointRadius: 0,
            borderWidth: 3,
            fill: true,
            tension: 0.5,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
          },
        ],
      };
    }
    return {
      labels: [],
      datasets: [],
    };
  }

  function volumeData(coinCount: number) {
    let data: ChartData<"bar", any, unknown> = {
      labels: [],
      datasets: [],
    };
    if (coinCount <= 1) {
      return {
        labels: everyNth(
          combinedChartCoins[0]?.volume.map(
            (item: { time: number }) => item.time
          ),
          numberOfDays
        ),
        datasets: [
          {
            label: combinedChartCoins[0]?.coinName,
            data: everyNth(
              combinedChartCoins[0]?.volume.map(
                (item: { yData: number }) => item.yData
              ),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin1.stopColor1,
            backgroundColor: (context: { chart: { ctx: any } }) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 350);
              gradient.addColorStop(
                0,
                colorsGroup?.coin1.stopColor1 || "rgba(255, 99, 2, 0.2)"
              );
              gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
              return gradient;
            },
            borderWidth: 3,
            fill: true,
            tension: 0.5,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
          },
        ],
      };
    }

    if (coinCount === 2) {
      return {
        labels: everyNth(
          combinedChartCoins[0]?.volume.map(
            (item: { time: number }) => item.time
          ),
          numberOfDays
        ),
        datasets: [
          {
            label: combinedChartCoins[0]?.coinName,
            data: everyNth(
              combinedChartCoins[0]?.volume.map(
                (item: { yData: number }) => item.yData
              ),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin1.stopColor1,
            backgroundColor: (context: { chart: { ctx: any } }) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 350);
              gradient.addColorStop(
                0,
                colorsGroup?.coin1.stopColor1 || "rgba(255, 99, 2, 0.2)"
              );
              gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
              return gradient;
            },
            pointRadius: 0,
            borderWidth: 3,
            fill: true,
            borderRadius: "5",
            tension: 0.5,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
          },
          {
            label: combinedChartCoins[1]?.coinName,
            data: everyNth(
              combinedChartCoins[1]?.volume.map(
                (item: { yData: number }) => item.yData
              ),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin2.stopColor1,
            backgroundColor: (context: { chart: { ctx: any } }) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 350);
              gradient.addColorStop(
                0,
                colorsGroup?.coin2.stopColor1 || "rgba(255, 99, 2, 0.2)"
              );
              gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
              return gradient;
            },
            pointRadius: 0,
            borderWidth: 3,
            fill: true,
            borderRadius: "5",
            tension: 0.5,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
          },
        ],
      };
    }
    if (coinCount === 3) {
      return {
        labels: everyNth(
          combinedChartCoins[0]?.volume.map(
            (item: { time: number }) => item.time
          ),
          numberOfDays
        ),
        datasets: [
          {
            label: combinedChartCoins[0]?.coinName,
            data: everyNth(
              combinedChartCoins[0]?.volume.map(
                (item: { yData: number }) => item.yData
              ),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin1.stopColor1,
            backgroundColor: (context: { chart: { ctx: any } }) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 350);
              gradient.addColorStop(
                0,
                colorsGroup?.coin1.stopColor1 || "rgba(255, 99, 2, 0.2)"
              );
              gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
              return gradient;
            },
            pointRadius: 0,
            borderWidth: 3,
            fill: true,
            borderRadius: "5",
            tension: 0.5,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
          },
          {
            label: combinedChartCoins[1]?.coinName,
            data: everyNth(
              combinedChartCoins[1]?.volume.map(
                (item: { yData: number }) => item.yData
              ),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin2.stopColor1,
            backgroundColor: (context: { chart: { ctx: any } }) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 350);
              gradient.addColorStop(
                0,
                colorsGroup?.coin2.stopColor1 || "rgba(255, 99, 2, 0.2)"
              );
              gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
              return gradient;
            },
            pointRadius: 0,
            borderWidth: 3,
            fill: true,
            borderRadius: "5",
            tension: 0.5,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
          },
          {
            label: combinedChartCoins[2]?.coinName,
            data: everyNth(
              combinedChartCoins[2]?.volume.map(
                (item: { yData: number }) => item.yData
              ),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin3.stopColor1,
            backgroundColor: (context: { chart: { ctx: any } }) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 350);
              gradient.addColorStop(
                0,
                colorsGroup?.coin3.stopColor1 || "rgba(255, 99, 2, 0.2)"
              );
              gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
              return gradient;
            },
            pointRadius: 0,
            borderWidth: 3,
            fill: true,
            borderRadius: "5",
            tension: 0.5,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
          },
        ],
      };
    }
    return data;
  }

  const dispatch = useAppDispatch();

  const handleClick = (coin: { id: any; name: any }) => {
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
  }, []);

  useEffect(() => {
    setDisplayLineData(
      combinedChartCoins[0]?.coinName +
        " " +
        currency?.symbol +
        combinedChartCoins[0]?.prices[combinedChartCoins.length - 1].yData
          .toFixed(2)
          .toString()
    );
    setDateToDisplay(
      convertUnixToDate(
        combinedChartCoins[0]?.prices[combinedChartCoins.length - 1].time
      )
    );
  }, [combinedChartCoins]);

  useEffect(() => {
    dispatch(
      timeInterval({
        chartCoins: combinedChartCoins,
        currency: currency.currency,
        days: numberOfDays,
      })
    );
  }, [numberOfDays, currency]);

  function handleNumberOfDays(value: React.SetStateAction<string>) {
    setNumberOfDays(value);
  }

  return (
    <div
      className={`flex flex-col justify-center items-center my-3 ${
        isLoading ? "cursor-wait" : ""
      }`}
    >
      <div className="text-xs flex items-center justify-center w-full mt-2">
        Select currency to view statistics
      </div>
      <div>
        <CoinSwiper
          handleClick={handleClick}
          combinedChartCoins={combinedChartCoins}
        />
      </div>
      <div></div>

      <div className="flex mt-4 w-[1010px] h-[350] items-center justify-between">
        <div className="w-[495px]  flex flex-col items-start justify-center bg-second rounded-lg drop-shadow-sm p-4">
          <div className="text-shadowDark text-lg font-bold">{`${displayLineData}`}</div>
          <div className="text-shadowDark text-sm font-semibold">{`${dateToDisplay}`}</div>
          <div className=" w-[475px] h-[300px]">
            <Line
              options={options}
              data={pricesData(combinedChartCoins.length)}
            />
          </div>
        </div>
        <div className="w-[495px] flex flex-col items-start justify-center bg-second rounded-md drop-shadow-sm p-4">
          <div className="text-shadowDark text-lg font-bold">Volume 24h</div>
          <div className="text-shadowDark text-sm font-semibold">{`${dateToDisplay}`}</div>
          <div className=" w-[475px] h-[300px]">
            <Bar
              options={options}
              data={volumeData(combinedChartCoins.length)}
            />
          </div>
        </div>
      </div>
      <div>
        <ChartsIntervalButtons
          handleNumberOfDays={handleNumberOfDays}
          numberOfDays={numberOfDays}
        />
      </div>
    </div>
  );
};

export default ChartsMain;
