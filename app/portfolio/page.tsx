"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";

import { CoinForm } from "@/components/CoinForm";
import { useCrypto } from "../Providers/CryptoProvider";
import { RootState } from "@/redux/store";
import { addCoin, removeCoin } from "@/redux/portfolio/portfolioSlice";
import { useDispatch } from "react-redux";

export default function Page() {
  const { currentCoins, getCoins, currency } = useCrypto();

  const portCoins = useAppSelector((state: RootState) => state.portfolio.coins);
  const dispatch = useDispatch();

  console.log("state", portCoins);

  useEffect(() => {
    getCoins();
  }, [currency]);

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div>
        <button
          onClick={() => dispatch(addCoin({ id: Math.random(), value: "hi" }))}
        >
          add coin
        </button>
        {/* {coins.map((coin, index) => (
          <li key={coin.id}>
            {coin.value}
            <button onClick={() => dispatch(removeCoin(coin.id))}>X</button>
          </li>
        ))} */}
      </div>
      <CoinForm currentCoins={currentCoins} />
      <div> PORTFOLIO TEXT</div>;
    </div>
  );
}
