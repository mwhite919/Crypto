import React from "react";
import { formatNumber, priceFormatNumber } from "@/app/utils/formatNumber";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import ArrowDown, { ArrowUp } from "../icons/Icons";
import { useAppSelector } from "@/redux/hooks";

const Row = styled.div`
  width: 1010px;
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
  const volumeMarketCap = (volume / marketCap) * 100;
  const circulating = coin?.circulating_supply;
  const totalSupply = Math.floor(coin.total_supply);
  const router = useRouter();
  const circulatingTotalSupply = (circulating / totalSupply) * 100;
  const coinPrice = coin?.current_price?.toFixed(2);
  const dataSet = coin?.price;

  function limiter(x) {
    if (x < 100) {
      return x;
    }
    if (x >= 100) {
      return 100;
    }
  }

  function greenOrRed(x: number, rounded: boolean, width: number) {
    if (x > 0) {
      if (rounded) {
        return "h-2 w-2 rounded-full bg-green-500";
      } else {
        return `h-2 bg-green-500 items-center`;
      }
    }
    if (x < 0) {
      if (rounded) {
        return "h-2 w-2 rounded-full bg-red-500";
      } else {
        return `h-2 bg-red-500 items-center items`;
      }
    }
  }

  function arrowUpOrDown(x: number) {
    if (x < 0) return <ArrowDown />;
    if (x > 0) return <ArrowUp />;
  }

  const graphData = coin?.sparkline_in_7d?.price.map((item) => {
    return { x: index, price: item };
  });

  const handleRoute = (coinId) => {
    const fixString = coinId.replace(/\W+/g, "-");
    return router.push(`/coininfo/${fixString}`);
  };

  return (
    <div>
      <Row className="bg-second shadow-md text-sm grid grid-cols-17 gap-2">
        <div className="flex items-center justify-center col-span-1">
          {index}
        </div>
        <div className="flex items-center justify-center col-span-1">
          <img src={coin.image} className="w-8 max-h-8 " alt="coin icon" />
        </div>
        <div className="col-span-2 cursor-pointer flex justify-start items-center hover:scale-105">
          <div onClick={() => handleRoute(coin.id)}>{coin.name}</div>
        </div>
        <div className="flex justify-start items-center col-span-2">
          {currency.symbol}
          {coinPrice}
        </div>
        <div className="flex justify-start items-center ml-1 col-span-1">
          {arrowUpOrDown(oneHourPercent)}
          {oneHourPercent}%
        </div>
        <div className="flex justify-start items-center ml-1 col-span-1">
          {arrowUpOrDown(oneDayPercent)}
          {oneDayPercent}%
        </div>
        <div className=" flex justify-start items-center col-span-1">
          {arrowUpOrDown(sevenDayPercent)}
          {sevenDayPercent}%
        </div>
        <div className="col-span-3 items-center justify-center">
          <div className="flex justify-between w-32 ml-2">
            <div className="flex items-center">
              <div className={greenOrRed(oneDayPercent, true)}></div>
              <div className="text-xs">{formatNumber(volume)}</div>
            </div>
            <div className="flex items-center">
              <div className="text-xs">{formatNumber(marketCap)}</div>
              <div className="h-2 w-2 rounded-full bg-gray-500"></div>
            </div>
          </div>
          <div className="h-2 w-32 bg-gray-500 items-center">
            <div
              style={{ width: limiter(volumeMarketCap) + "%" }}
              className={greenOrRed(oneDayPercent, false)}
            ></div>
          </div>
        </div>

        <div className="col-span-3 items-center justify-center">
          <div className="flex justify-between w-32">
            <div className="flex items-center">
              <div className={greenOrRed(oneDayPercent, true)}></div>
              <div className="text-xs">{formatNumber(circulating)}</div>
            </div>
            <div className="flex items-center">
              <div className="text-xs">{formatNumber(totalSupply)}</div>{" "}
              <div className="h-2 w-2 rounded-full bg-gray-500"></div>
            </div>
          </div>
          <div className="h-2 w-32 bg-gray-500 items-center">
            <div
              className={greenOrRed(oneDayPercent, false)}
              style={{ width: limiter(circulatingTotalSupply) + "%" }}
            ></div>
          </div>
        </div>
        <div className="col-span-2">
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
    </div>
  );
}
