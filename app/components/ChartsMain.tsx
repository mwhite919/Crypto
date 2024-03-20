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
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line, Bar } from "react-chartjs-2";
import { graphStyling } from "../constants/graphStyling";
import { useCrypto } from "../Providers/CryptoProvider";
import { every_nth } from "./Every_nth";
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

export const ChartsMain = () => {
  const combinedChartCoins = useAppSelector(
    (state) => state.chartCoins.chartCoins
  );

  const currency = useAppSelector((state) => state.currency);

  const [numberOfDays, setNumberOfDays] = useState("7");
  const [displayLineData, setDisplayLineData] = useState("");
  const [dateToDisplay, setDateToDisplay] = useState("");
  const { palette, mode } = useCrypto();
  const colorsGroup = graphStyling[palette];

  function units(num) {
    if (num == 1) {
      return "hour";
    }
    if (num >= 2) {
      return "day";
    }
    if (num >= 180) {
      return "week";
    }
  }

  const options = {
    animation: {
      duration: 2000,
    },
    maintainAspectRatio: false,
    interaction: { mode: "index" },
    color: "white",
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
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: currency.currency,
              }).format(context.parsed.y);
            }
            setDisplayLineData(label);
            setDateToDisplay(convertUnixToDate(context.parsed.x));
            return label;
          },
        },
      },
      hover: {
        mode: "nearest",
        intersect: false,
      },
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
            color: "white",
          },
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
  };

  console.log(
    currency.symbol +
      combinedChartCoins[0]?.prices[
        combinedChartCoins.length - 1
      ].yData.toFixed(2),

    convertUnixToDate(
      combinedChartCoins[0]?.prices[combinedChartCoins.length - 1].time
    )
  );

  function pricesData(coinCount: number) {
    if (coinCount <= 1) {
      return {
        labels: every_nth(
          combinedChartCoins[0]?.prices.map((item) => item.time),
          numberOfDays
        ),
        datasets: [
          {
            label: combinedChartCoins[0]?.coinName,
            data: every_nth(
              combinedChartCoins[0]?.prices.map((item) => item.yData),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin1.stopColor1,
            backgroundColor: (context) => {
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
        ],
      };
    }

    if (coinCount === 2) {
      return {
        labels: every_nth(
          combinedChartCoins[0]?.prices.map((item) => item.time),
          numberOfDays
        ),
        datasets: [
          {
            label: combinedChartCoins[0]?.coinName,
            data: every_nth(
              combinedChartCoins[0]?.prices.map((item) => item.yData),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin1.stopColor1,
            backgroundColor: (context) => {
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
            data: every_nth(
              combinedChartCoins[1]?.prices.map((item) => item.yData),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin2.stopColor1,
            backgroundColor: (context) => {
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
        labels: every_nth(
          combinedChartCoins[0]?.prices.map((item) => item.time),
          numberOfDays
        ),
        datasets: [
          {
            label: combinedChartCoins[0]?.coinName,
            data: every_nth(
              combinedChartCoins[0]?.prices.map((item) => item.yData),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin1.stopColor1,
            backgroundColor: (context) => {
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
            data: combinedChartCoins[1]?.prices.map((item) => item.yData),
            borderColor: colorsGroup?.coin2.stopColor1,
            backgroundColor: (context) => {
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
            data: every_nth(
              combinedChartCoins[2]?.prices.map((item) => item.yData),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin3.stopColor1,
            backgroundColor: (context) => {
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
  }

  function volumeData(coinCount: number) {
    if (coinCount <= 1) {
      return {
        labels: every_nth(
          combinedChartCoins[0]?.volume.map((item) => item.time),
          numberOfDays
        ),
        datasets: [
          {
            label: combinedChartCoins[0]?.coinName,
            data: every_nth(
              combinedChartCoins[0]?.volume.map((item) => item.yData),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin1.stopColor1,
            backgroundColor: (context) => {
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
        ],
      };
    }

    if (coinCount === 2) {
      return {
        labels: every_nth(
          combinedChartCoins[0]?.volume.map((item) => item.time),
          numberOfDays
        ),
        datasets: [
          {
            label: combinedChartCoins[0]?.coinName,
            data: every_nth(
              combinedChartCoins[0]?.volume.map((item) => item.yData),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin1.stopColor1,
            backgroundColor: (context) => {
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
            data: every_nth(
              combinedChartCoins[1]?.volume.map((item) => item.yData),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin2.stopColor1,
            backgroundColor: (context) => {
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
        labels: every_nth(
          combinedChartCoins[0]?.volume.map((item) => item.time),
          numberOfDays
        ),
        datasets: [
          {
            label: combinedChartCoins[0]?.coinName,
            data: every_nth(
              combinedChartCoins[0]?.volume.map((item) => item.yData),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin1.stopColor1,
            backgroundColor: (context) => {
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
            data: every_nth(
              combinedChartCoins[1]?.volume.map((item) => item.yData),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin2.stopColor1,
            backgroundColor: (context) => {
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
            data: every_nth(
              combinedChartCoins[2]?.volume.map((item) => item.yData),
              numberOfDays
            ),
            borderColor: colorsGroup?.coin3.stopColor1,
            backgroundColor: (context) => {
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
  }

  const dispatch = useAppDispatch();

  const handleClick = (coin) => {
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

  function handleNumberOfDays(value) {
    setNumberOfDays(value);
  }

  return (
    <div className="flex flex-col justify-center items-center my-3">
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
