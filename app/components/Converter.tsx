import { ChangeEvent, SetStateAction, useState } from "react";
import styled from "styled-components";
import { ExchangeIcon } from "../icons/Icons";
import { useAppSelector } from "@/redux/hooks";
import { Line } from "react-chartjs-2";
import { useCrypto } from "../Providers/CryptoProvider";
import {
  Chart as ChartJS,
  LogarithmicScale,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  ChartOptions,
} from "chart.js";
ChartJS.register(
  LogarithmicScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Legend
);
import { graphStyling } from "../constants/graphStyling";
import { DropDownRow } from "../constants/DropDownRow";
import { CoinType } from "../sharedinterfaces";
import Image from "next/image";

const ConverterBox = styled.div`
  width: 1010px;
  @media (max-width: 640px) {
    width: 300px;
  }
`;

type GraphStyle = keyof typeof graphStyling;

const Converter = ({ allCoinsData }: { allCoinsData: CoinType[] }) => {
  const currency = useAppSelector((state) => state.currency);
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [coin1, setCoin1] = useState(allCoinsData[0]);
  const [coin2, setCoin2] = useState(allCoinsData[1]);
  const [variable1, setvariable1] = useState(0);
  const [variable2, setvariable2] = useState(0);

  const { palette, mode } = useCrypto();

  const colorsGroup = graphStyling[palette as GraphStyle];

  const handleConversionLtR = (e: ChangeEvent<HTMLInputElement>) => {
    const result = parseInt(e.target.value.replace(/\D/g, ""));
    const conversion = (result * coin1.current_price) / coin2.current_price;
    setvariable1(result);
    setvariable2(conversion);
  };

  const handleConversionRtL = (e: ChangeEvent<HTMLInputElement>) => {
    const result = parseInt(e.target.value.replace(/\D/g, ""));
    const conversion = (result * coin2.current_price) / coin1.current_price;
    setvariable2(result);
    setvariable1(conversion);
  };

  const conversionGraphData = coin1?.sparkline_in_7d.price.map((c, index) => ({
    time: index,
    conversion: c / coin2?.sparkline_in_7d.price[index],
  }));

  const options: ChartOptions<"line"> = {
    animation: {
      duration: 2000,
    },
    layout: {
      padding: 10,
    },
    maintainAspectRatio: false,
    interaction: { mode: "index" },
    plugins: {
      title: {
        display: true,
        text: `${coin1.name} to ${coin2.name}`,
        position: "top",
        align: "start",
      },
      legend: {
        display: false,
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
          unit: "day",
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

  const data = {
    labels: conversionGraphData?.map((item) => item.time),
    datasets: [
      {
        data: conversionGraphData?.map((item) => item.conversion),
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
    ],
  };

  const onChange1 = (e: { target: { value: SetStateAction<string> } }) => {
    setValue1(e.target.value);
  };

  const onChange2 = (e: { target: { value: SetStateAction<string> } }) => {
    setValue2(e.target.value);
  };

  const onSearch1 = (coin: SetStateAction<CoinType>) => {
    setCoin1(coin);
    setValue1("");
  };

  const onSearch2 = (coin: SetStateAction<CoinType>) => {
    setCoin2(coin);
    setValue2("");
  };

  return (
    <>
      <div>
        <ConverterBox className="my-10 rounded-lg w-[300px] sm:w-96 flex flex-col sm:flex-row justify-between items-center ">
          <div className="flex flex-col w-[300px] sm:w-full h-full bg-second text-shadowDark drop-shadow-lg rounded-md">
            <div className="flex justify-center flex-col items-start w-full h-full">
              <div className="flex justify-between items-end w-full py-3 px-5 ">
                <div>
                  <h2 className="text-sm">You sell:</h2>
                  {coin1 && (
                    <div className="flex items-center">
                      <Image
                        src={coin1.image as string}
                        height={32}
                        className="m-2"
                        alt="First Coin Icon"
                      />
                      <h1 className="sm:text-xl">
                        {coin1.name} ({coin1?.symbol?.toUpperCase()})
                      </h1>
                    </div>
                  )}
                </div>
                <div>
                  <input
                    value={variable1}
                    onChange={(value) => handleConversionLtR(value)}
                    className="w-20 sm:w-44 my-2 rounded-md pl-2 text-right bg-second text-shadowDark"
                  />
                </div>
              </div>
              <div className="mx-auto bg-accent m-3 h-px w-11/12"></div>
              <div className="pl-5">
                {coin1 && (
                  <div className="text-sm">
                    1{coin1.symbol.toUpperCase()}={currency.symbol}
                    {coin1.current_price}
                  </div>
                )}
                <input
                  className="border-accent my-4 rounded-md relative inline-block bg-second text-shadowDark"
                  value={value1}
                  onChange={onChange1}
                  placeholder="Search Coins..."
                />
                <div className="absolute max-h-44 overflow-auto">
                  {value1 &&
                    allCoinsData
                      ?.filter((coin) => {
                        const name = coin.name.toLowerCase();
                        const search = value1.toLowerCase();
                        return name.startsWith(search);
                      })
                      .map((coin) => (
                        <DropDownRow
                          key={coin.id}
                          className="bg-shadowLight text-shadowDark hover:text-shadowLight hover:bg-shadowDark border-slate-300 block"
                          onClick={() => onSearch1(coin)}
                        >
                          {coin.name}
                        </DropDownRow>
                      ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-full border-solid bg-accent abolute">
            <ExchangeIcon />
          </div>

          <div className="flex justify-center flex-col items-start rounded-md w-[300px] sm:w-full bg-second drop-shadow-lg text-shadowDark h-full">
            <div className="flex justify-between items-end w-full py-3 px-5">
              <div className="flex flex-col">
                <div className="sm:w-7/12">
                  <h2 className="text-sm">You buy:</h2>
                  {coin2 && (
                    <div className="flex items-center">
                      <Image
                        alt="coin logo"
                        src={coin2.image as string}
                        className="m-2"
                        height={32}
                      />
                      <h1 className="font-semibold sm:text-xl">
                        {coin2.name}({coin2?.symbol?.toUpperCase()})
                      </h1>
                    </div>
                  )}
                </div>
              </div>
              <input
                onChange={(value) => handleConversionRtL(value)}
                value={variable2}
                id="v2"
                className="w-20 my-2 sm:w-44 rounded-md pl-2 text-right bg-second text-shadowDark"
              />
            </div>

            <div className="mx-auto m-3 bg-accent h-px w-11/12"></div>
            <div className="pl-5">
              {coin2 && (
                <div className="text-sm">
                  1{coin2.symbol.toUpperCase()}={currency.symbol}
                  {coin2.current_price}
                </div>
              )}
              <input
                className="border-accent my-4 rounded-md relative inline-block bg-second text-shadowDark"
                type="text"
                value={value2}
                onChange={onChange2}
                placeholder="Search Coins..."
              />
              <div className="absolute max-h-44 overflow-auto">
                {value2 &&
                  allCoinsData
                    ?.filter((coin) => {
                      const name = coin.name.toLowerCase();
                      const search = value2.toLowerCase();
                      return name.startsWith(search);
                    })
                    .map((coin) => (
                      <DropDownRow
                        key={coin.id}
                        className="bg-shadowLight text-shadowDark hover:text-shadowLight hover:bg-shadowDark border-slate-300 block"
                        onClick={() => onSearch2(coin)}
                      >
                        {coin.name}
                      </DropDownRow>
                    ))}
              </div>
            </div>
          </div>
        </ConverterBox>
        <div className="w-[300px] flex justify-center items-center h-64 sm:w-full rounded-lg p-0">
          <Line options={options} data={data} />
        </div>
      </div>
    </>
  );
};

export default Converter;
