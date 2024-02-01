import React from "react";
import ArrowDown, { ArrowUp } from "../icons/Icons";
import aveta from "aveta";
import Link from "next/link";
import styled from "styled-components";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";


const Row = styled.div`
  width: 1010px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  padding-top: 4px;
  border-radius: 10px;
`;

export default function CoinRow({ coin, index, currency }) {
  const oneHourPercent = coin.price_change_percentage_1h_in_currency.toFixed(2);
  const oneDayPercent = coin.price_change_percentage_24h_in_currency.toFixed(2);
  const sevenDayPercent = coin.price_change_percentage_7d_in_currency.toFixed(
    2
  );
  const volume = coin.total_volume;
  const marketCap = coin.market_cap;
  const volumeMarketCap = (volume / marketCap).toFixed(2) * 30;
  const circulating = coin.circulating_supply;
  const totalSupply = Math.floor(coin.total_supply);
  const circulatingTotalSupply = (circulating / totalSupply).toFixed(2) * 30;
  const coinPrice = coin.current_price.toFixed(2);
  const dataSet = coin.price;

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

  return (
    <Row className=" bg-second">
      <div className="m-3">{index}</div>
      <div>
        <img
          src={coin.image}
          className="max-w-8 max-h-8 ml-2 "
          alt="coin icon"
        />
      </div>
      <div className="max-w-40 min-w-40 px-10 flex justify-start items-center">
        <Link href={`/coininfo/${coin.name}`}>{coin.name}</Link>
      </div>
      <div className="max-w-20 min-w-20 flex justify-start items-center">
        ${coinPrice}
      </div>
      <div className="max-w-20 min-w-20 pl-5 flex justify-start items-center">
        {oneHourPercent < 0 ? <ArrowDown /> : <ArrowUp />}
        {oneHourPercent}%
      </div>
      <div className="max-w-20 min-w-20 pl-5 flex justify-start items-center">
        {oneDayPercent < 0 ? <ArrowDown /> : <ArrowUp />}
        {oneDayPercent}%
      </div>
      <div className="max-w-20 min-w-20 pl-5 flex justify-start items-center">
        {sevenDayPercent < 0 ? <ArrowDown /> : <ArrowUp />}
        {sevenDayPercent}%
      </div>

      <div className="max-w-40 min-w-40 pl-5">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div
              className={
                oneDayPercent > 0
                  ? "h-2 w-2 rounded-full bg-green-500"
                  : "h-2 w-2 rounded-full bg-red-500"
              }
            ></div>
            {aveta(volume)}
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full  bg-gray-500"></div>
            {aveta(marketCap)}
          </div>
        </div>
        <div className="h-2 w-30 bg-gray-500">
          <div
            className={
              oneDayPercent > 0
                ? "h-2 w-30 bg-green-500"
                : "h-2 w-30 bg-red-500"
            }
            style={{ width: volumeMarketCap }}
          ></div>
        </div>
      </div>

      <div className="max-w-40 min-w-40 pl-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div
              className={
                oneDayPercent > 0
                  ? "h-2 w-2 rounded-full bg-green-500"
                  : "h-2 w-2 rounded-full bg-red-500"
              }
            ></div>
            {aveta(circulating)}
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-gray-500"></div>
            {aveta(totalSupply)}
          </div>
        </div>
        <div className="h-2 w-30 bg-gray-500">
          <div
            className={
              oneDayPercent > 0
                ? "h-2 w-30 bg-green-500"
                : "h-2 w-30 bg-red-500"
            }
            style={{ width: circulatingTotalSupply }}
          ></div>
        </div>
      </div>

      <div className="px-5">
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
          <Tooltip />
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
  );
}