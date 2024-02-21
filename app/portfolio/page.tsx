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
  const [addFormOn, setAddFormOn] = useState(false);
  const { currentCoins, getCoins, currency, user, userSession } = useCrypto();
  const portCoins = useAppSelector((state: RootState) => state.portfolio.coins);
  const dispatch = useDispatch();

  const handleForm = () => {
    setAddFormOn(false);
  };

  useEffect(() => {
    getCoins();
  }, [currency]);

  if (!user && !userSession) {
    router.push("/sign-up");
  }

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="w-full flex justify-end my-8 mr-36">
        <button
          className="bg-accent p-4 rounded-lg"
          onClick={() => setAddFormOn(!addFormOn)}
        >
          Add Asset
        </button>
      </div>
      <div>
        {addFormOn && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CoinForm currentCoins={currentCoins} handleForm={handleForm} />
          </div>
        )}
      </div>
      <div> Your Assets:</div>
      <PortfolioList />
    </div>
  );
}
