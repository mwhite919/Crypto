import React from "react";
import { formatNumber } from "@/app/formatNumber";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";
import ArrowDown, { ArrowUp } from "../icons/Icons";
import { useAppSelector } from "@/redux/hooks";

const Row = styled.div`
  width: 1010px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  padding-top: 4px;
  border-radius: 10px;
`;

export default function CoinRow({ coin, index }) {
  const currency = useAppSelector((state) => state.currency);

  const oneHourPercent = coin?.price_change_percentage_1h_in_currency?.toFixed(
    2
  );
  const oneDayPercent = coin?.price_change_percentage_24h_in_currency?.toFixed(
    2
  );
  const sevenDayPercent = coin?.price_change_percentage_7d_in_currency?.toFixed(
    2
  );
  const volume = coin?.total_volume;
  const marketCap = coin?.market_cap;
  const volumeMarketCap = (volume / marketCap).toFixed(2) * 30;
  const circulating = coin?.circulating_supply;
  const totalSupply = Math.floor(coin.total_supply);
  const router = useRouter();

  function limiter(x) {
    if (x < 1) {
      return x;
    }
    if (x >= 1) {
      return 100;
    }
  }
  const circulatingTotalSupply = (circulating / totalSupply).toFixed(2) * 30; // need to make a function to prevent over 100%

  const coinPrice = coin?.current_price?.toFixed(2);
  const dataSet = coin?.price;

  const graphData = coin?.sparkline_in_7d?.price.map((item) => {
    return { x: index, price: item };
  });

  const data = {
    label: "",
    datasets: [
      {
        labels: "sales",
        data: dataSet,
        backgroundColor: "white",
        borderColor: "black",
        pointBorderColor: "pink",
      },
    ],
  };

  const handleRoute = (coinId) => {
    const fixString = coinId.replace(/\W+/g, "-");
    return router.push(`/coininfo/${fixString}`);
  };

  return (
    <div>
      <Row className="bg-second shadow-md text-sm">
        <div className="flex items-center justify-center" style={{ width: 80 }}>
          {index}
        </div>
        <div
          className="flex items-center justify-center"
          style={{ width: 115 }}
        >
          <img src={coin.image} className="w-8 max-h-8 " alt="coin icon" />
        </div>
        <div
          style={{ width: 250 }}
          className="col-span-3 cursor-pointer flex justify-start items-center hover:scale-105"
        >
          <div onClick={() => handleRoute(coin.id)}>{coin.name}</div>
        </div>
        <div className="flex justify-start items-center" style={{ width: 250 }}>
          {currency.symbol}
          {coinPrice}
        </div>
        <div className="flex justify-start items-center" style={{ width: 150 }}>
          {oneHourPercent < 0 ? <ArrowDown /> : <ArrowUp />}
          {oneHourPercent}%
        </div>
        <div className="flex justify-start items-center" style={{ width: 150 }}>
          {oneDayPercent < 0 ? <ArrowDown /> : <ArrowUp />}
          {oneDayPercent}%
        </div>
        <div
          className=" flex justify-start items-center"
          style={{ width: 150 }}
        >
          {sevenDayPercent < 0 ? <ArrowDown /> : <ArrowUp />}
          {sevenDayPercent}%
        </div>

        <div style={{ width: 300 }}>
          <div className="flex justify-between">
            <div className="flex items-center">
              <div
                className={
                  oneDayPercent > 0
                    ? "h-2 w-2 rounded-full bg-green-500"
                    : "h-2 w-2 rounded-full bg-red-500"
                }
              ></div>
              <div className="text-xs">{formatNumber(volume)}</div>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full  bg-gray-500"></div>
              <div className="text-xs">{formatNumber(marketCap)}</div>
            </div>
          </div>
          <div className="h-2 w-32 bg-gray-500">
            <div
              className={
                oneDayPercent > 0
                  ? "h-2 w-30 bg-green-500"
                  : "h-2 w-30 bg-red-500"
              }
              style={{ width: limiter(volumeMarketCap) }}
            ></div>
          </div>
        </div>

        <div style={{ width: 300 }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className={
                  oneDayPercent > 0
                    ? "h-2 w-2 rounded-full bg-green-500"
                    : "h-2 w-2 rounded-full bg-red-500"
                }
              ></div>
              <div className="text-xs">{formatNumber(circulating)}</div>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-gray-500"></div>
              <div className="text-xs">{formatNumber(totalSupply)}</div>
            </div>
          </div>
          <div className="h-2 w-32 bg-gray-500">
            <div
              className={
                oneDayPercent > 0
                  ? "h-2 w-30 bg-green-500"
                  : "h-2 w-30 bg-red-500"
              }
              style={{ width: limiter(circulatingTotalSupply) }}
            ></div>
          </div>
        </div>

        <div style={{ width: 250 }}>
          <AreaChart
            width={130}
            height={50}
            data={graphData}
            margin={{ top: 10, right: 30, left: 0, bottom: 2 }}
          >
            <defs>
              <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis hide domain={["auto", "auto"]} />
            <YAxis scale="log" domain={["auto", "auto"]} hide />

            <Area
              type="monotone"
              dataKey="price"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorP)"
            />
          </AreaChart>
        </div>
      </Row>
    </div>
  );
}
