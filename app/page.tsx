"use client";

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useCrypto } from "./Providers/CryptoProvider";
import CoinRow from "../components/CoinRow";
import ChartsMain from "../components/ChartsMain";
import Converter from "../components/Converter";
import styled from "styled-components";

const Row = styled.div`
  width: 1000px;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  padding: 3px;
  border-radius: 10px;
`;

export default function Page() {
  const { getCoins, barData, currentCoins } = useCrypto();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [chartCoin, setChartCoin] = useState();
  const [calculator, setCalculator] = useState(false);

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <div className="bg-base flex justify-center items-center flex-col">
      <div>
        <div>{isLoading && <h2>fetching data...</h2>}</div>
        <div>{error && <h2>page loading</h2>}</div>
      </div>
      <div className="flex">
        <div
          onClick={() => setCalculator(false)}
          className="border-black bg-gray-300 w-16 m-5"
        >
          Coins
        </div>
        <div
          onClick={() => setCalculator(true)}
          className="border-black bg-gray-300 w-18 m-5"
        >
          Converter
        </div>
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
        <Row className="bg-second">
          <div className="m-3">#</div>
          <div className="w-9 max-h-8 ml-2"></div>
          <div className="max-w-40 min-w-40 px-10 ">Name</div>
          <div className="max-w-20 min-w-20 ">Price</div>
          <div className="max-w-20 min-w-20 pl-5">1h%</div>
          <div className="max-w-20 min-w-20 pl-5">24hr%</div>
          <div className="max-w-20 min-w-20 pl-5">7d%</div>
          <div className="max-w-40 min-w-40 pl-5">24h Volume/<br></br>Market Cap</div>
          <div className="max-w-40 min-w-40 pl-5">Circulating/<br></br> Total Supply</div>
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
