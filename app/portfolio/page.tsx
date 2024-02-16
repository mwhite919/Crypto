"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { addCoin, removeCoin } from "@/redux/portfolio/portfolioSlice";
import { useDispatch } from "react-redux";
import PortfolioList from "@/components/PortfolioList";
import { CoinForm } from "@/components/CoinForm";
import { useCrypto } from "../Providers/CryptoProvider";
import { RootState } from "@/redux/store";

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
      <CoinForm currentCoins={currentCoins} />
      <div> PORTFOLIO TEXT</div>
      <PortfolioList />
    </div>
  );
}
