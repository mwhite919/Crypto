
"use client";

import { useState, useEffect } from "react";
import { usePortfolio } from "../Providers/PortfolioProvider";
import { CoinForm } from "@/components/CoinForm";
import { useCrypto } from "../Providers/CryptoProvider";

export default function Page() {
  const { currentCoins, getCoins, currency } = useCrypto();

  useEffect(() => {
    getCoins();
  }, [currency]);

  return (
    <div className="w-full flex items-center justify-center">
      <CoinForm currentCoins={currentCoins} />
      <div> Porfoloiolsls</div>;
    </div>
  );
