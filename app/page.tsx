"use client";

import { useState, useEffect } from "react";
import { useGetAllCoinsQuery } from "./Providers/api/apiSlice";
import { useCrypto } from "./Providers/CryptoProvider";
import CoinRow from "./components/CoinRow";
import ChartsMain from "./components/ChartsMain";
import Converter from "./components/Converter";
import styled from "styled-components";
import { RadioGroup } from "@headlessui/react";
import { CoinSwiper } from "@/app/components/CoinSwiper";
import InfiniteScroll from "react-infinite-scroll-component";

const Row = styled.div`
  width: 1010px;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  padding: 3px;
  border-radius: 10px;
`;

export default function Page() {
  const { currency, currencySymbol, palette, mode } = useCrypto();
  const [calculator, setCalculator] = useState(false);

  const { data: allCoinsData, error, isError, isLoading } = useGetAllCoinsQuery(
    {
      currency: "usd",
      sortValue: "volume_desc",
    }
  );

  return (
    <div
      className={`bg-base flex justify-center items-center flex-col pt-24 theme-${palette} theme-${mode} top-36`}
    >
      <div>
        <div>{isLoading && <h2>fetching data...</h2>}</div>
        <div>{error && <h2>page loading</h2>}</div>
      </div>
      <div>
        <RadioGroup
          className="flex items-center justify-center m-5 text-base "
          value={calculator}
          onChange={setCalculator}
        >
          <RadioGroup.Option
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 hover:scale-105"
                  : ""
              }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 w-36 m-1 justify-center shadow-md focus:outline-none hover:scale-105`
            }
            value={false}
          >
            {({ checked }) => <span className={checked && ""}>Coins</span>}
          </RadioGroup.Option>
          <RadioGroup.Option
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 hover:scale-105"
                  : ""
              }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 m-1 w-36 justify-center shadow-md focus:outline-none hover:scale-105`
            }
            value={true}
          >
            {({ checked }) => <span className={checked && ""}>Converter</span>}
          </RadioGroup.Option>
        </RadioGroup>
      </div>
      <div>
        <CoinSwiper />
      </div>
      <div>
        {calculator ? (
          <Converter allCoinsData={allCoinsData} />
        ) : (
          <div>
            <ChartsMain />
          </div>
        )}
      </div>
      <div>
        <Row className="bg-second flex shadow-md">
          <div className="w-3 m-3">#</div>
          <div className="w-8 max-h-8 ml-2"></div>
          <div className="w-40 ml-8 flex justify-start items-center">Name</div>
          <div className="w-20">Price</div>
          <div className="w-20 ml-5">1h%</div>
          <div className="w-20 ml-5">24hr%</div>
          <div className="w-20 ml-5">7d%</div>
          <div className="w-32 ml-5">
            24h Volume/<br></br>Market Cap
          </div>
          <div className="w-32 ml-5">
            Circulating/<br></br> Total Supply
          </div>
          <div className="ml-4">Last 7d</div>
        </Row>
      </div>
      <div>
        {allCoinsData?.map((coin, index, currency) => (
          <div key={coin.id}>
            <CoinRow coin={coin} index={index + 1} currency={currency} />
          </div>
        ))}
      </div>
    </div>
  );
}
