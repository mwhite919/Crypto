import React from "react";
import { formatNumber } from "@/app/utils/formatNumber";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import ArrowDown, { ArrowUp } from "../icons/Icons";
import { useAppSelector } from "@/redux/hooks";
import { graphStyling } from "../constants/graphStyling";
import { useCrypto } from "../Providers/CryptoProvider";
import {
  Chart as ChartJS,
  LogarithmicScale,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  LogarithmicScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale
);
import { CoinType } from "../sharedinterfaces";

const Row = styled.div`
  width: 1010px;
  margin-top: 10px;
  padding-top: 4px;
  border-radius: 10px;
`;

interface Props {
  coin: CoinType;
  index: number;
}

type GraphStyle = keyof typeof graphStyling;

interface GraphData {
  labels: number[];
  datasets: {
    data: number[];
    borderColor: string;
    pointRadius: number;
    borderWidth: number;
    fill: boolean;
    borderRadius: string;
    tension: number;
    pointBackgroundColor: string;
    pointBorderColor: string;
  }[];
}

export default function CoinRow({ coin, index }: Props) {
  const currency = useAppSelector((state) => state.currency);
  const { palette } = useCrypto();

  const colorsGroup = graphStyling[palette as GraphStyle];

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

  function limiter(x: number) {
    if (x < 100) {
      return x;
    }
    if (x >= 100) {
      return 100;
    }
  }

  function greenOrRed(x: number, rounded: boolean) {
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

  const graphData = coin?.sparkline_in_7d?.price.map(
    (item: any, index: any) => {
      return { x: index, y: item };
    }
  );
  const data: GraphData = {
    labels: [1, 2, 3, 4, 5],
    datasets: [
      {
        data: [10, 20, 30, 40, 50],
        borderColor: "red",
        pointRadius: 0,
        borderWidth: 1,
        fill: true,
        borderRadius: "5",
        tension: 0.5,
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        type: "logarithmic",
        display: false,
      },
      x: {
        type: "time",
        display: false,
      },
    },
  };

  const handleRoute = (coinId: string) => {
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
          {arrowUpOrDown(Number(oneHourPercent))}
          {oneHourPercent}%
        </div>
        <div className="flex justify-start items-center ml-1 col-span-1">
          {arrowUpOrDown(Number(oneDayPercent))}
          {oneDayPercent}%
        </div>
        <div className=" flex justify-start items-center col-span-1">
          {arrowUpOrDown(Number(sevenDayPercent))}
          {sevenDayPercent}%
        </div>
        <div className="col-span-3 flex flex-col items-center justify-center">
          <div className="flex justify-between w-32 ml-2">
            <div className="flex items-center">
              <div className={greenOrRed(Number(oneDayPercent), true)}></div>
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
              className={greenOrRed(Number(oneDayPercent), false)}
            ></div>
          </div>
        </div>

        <div className="col-span-3 flex items-center justify-center flex-col">
          <div className="flex justify-between w-32">
            <div className="flex items-center">
              <div className={greenOrRed(Number(oneDayPercent), true)}></div>
              <div className="text-xs">{formatNumber(circulating)}</div>
            </div>
            <div className="flex items-center">
              <div className="text-xs">{formatNumber(totalSupply)}</div>{" "}
              <div className="h-2 w-2 rounded-full bg-gray-500"></div>
            </div>
          </div>
          <div className="h-2 w-32 bg-gray-500 items-center">
            <div
              className={greenOrRed(Number(oneDayPercent), false)}
              style={{ width: limiter(circulatingTotalSupply) + "%" }}
            ></div>
          </div>
        </div>
        <div className="col-span-2 flex items-start justify-center">
          <Line options={options} data={data} className="p-1" />
        </div>
      </Row>
    </div>
  );
}
