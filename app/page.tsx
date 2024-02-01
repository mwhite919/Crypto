"use client";

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useCrypto } from "./Providers/CryptoProvider";
import CoinRow from "../components/CoinRow";
import ChartsMain from "../components/ChartsMain";
import Converter from "../components/Converter";
import styled from "styled-components";
import { RadioGroup } from "@headlessui/react";
import { Swiper } from "@/components/Swiper";

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
  const { getCoins, barData, currentCoins, currency, currencySymbol } = useCrypto();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [chartCoin, setChartCoin] = useState();
  const [calculator, setCalculator] = useState(false);

  useEffect(() => {
    getCoins();
  }, [currency, currentCoins, barData]);

  return (
    <div className="bg-base flex justify-center items-center flex-col">
      <div>
        <div>{isLoading && <h2>fetching data...</h2>}</div>
        <div>{error && <h2>page loading</h2>}</div>
      </div>
      <div >
        <RadioGroup className="flex items-center justify-center mt-5 text-base" value={calculator} onChange={setCalculator}>
          <RadioGroup.Option className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                } value={false}>
            {({ checked }) => (
              <span className={checked && ""}>Coins</span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                      ${checked ? "bg-accent text-white" : "bg-white"}
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }  value={true}>
            {({ checked }) => (
              <span className={checked && ""}>Converter</span>
            )}
          </RadioGroup.Option>
        </RadioGroup>
      </div>
      <div>
        <Swiper />
      </div>
      <div>
        {calculator ? (
          <Converter currentCoins={currentCoins} />
        ) : (
          <div>
            <ChartsMain />
          </div>
        )}
      </div>
      <div>
        <Row className="bg-second flex">
          <div className="m-3">#</div>
          <div className="w-9 max-h-8 ml-2"></div>
          <div className="max-w-40 min-w-40 px-10 ">Name</div>
          <div className="max-w-20 min-w-20 ">Price</div>
          <div className="max-w-20 min-w-20 pl-5">1h%</div>
          <div className="max-w-20 min-w-20 pl-5">24hr%</div>
          <div className="max-w-20 min-w-20 pl-5">7d%</div>
          <div className="max-w-40 min-w-40 pl-5">
            24h Volume/<br></br>Market Cap
          </div>
          <div className="max-w-40 min-w-40 pl-5">
            Circulating/<br></br> Total Supply
          </div>
          <div className="pl-4">Last 7d</div>
        </Row>
      </div>
      <div>
        {currentCoins?.map((coin, index, currency) => (
          <div key={coin.id}>
            <CoinRow coin={coin} index={index + 1} currency={currency} />
          </div>
        ))}
      </div>
    </div>
  );
}
