"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import aveta from "aveta";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useCrypto } from "../app/Providers/CryptoProvider";


const Bar = styled.div`
  width: 16%;
`;

export default function Navigation() {
  const { getBarInfo, handleCurrency, barData } = useCrypto();
 

  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const marketCoins = barData?.data?.active_cryptocurrencies;
  const totalVolume = Math.floor(barData?.data?.total_volume?.usd);
  const totalMarketCap = Math.floor(barData?.data?.total_market_cap.usd);
  const marketCapPercentageBTC = barData?.data?.market_cap_percentage?.btc.toFixed(
    2
  );
  const marketCapPercentageETH = barData?.data?.market_cap_percentage?.eth.toFixed(
    2
  );
  const width = marketCapPercentageETH / 100;

  useEffect(() => {
    getBarInfo();
  }, []);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
  };

  const handleSearch = (e) => {
    if (searchValue) return router.push(`/coininfo/${searchValue}`);
    if (!searchValue) {
      return router.push("/");
    }
  };

  const handleKeyPress = (e: { key: any }) => {
    if (e.key === "Enter") return handleSearch(e);
  };

  return (
    <>
      <nav className="flex flex-col justify-center ">
      <div className="flex items-center justify-center bg-accent ">
            <div className="mx-4 text-second">Coins:{marketCoins}</div>
            <div className="mx-4 text-second">{totalVolume && aveta(totalVolume)}</div>
            <div className="mx-4 text-second">{totalMarketCap && aveta(totalMarketCap)}</div>

            <div className="mx-4 text-second flex items-center justify-center">
              <div>BTC {marketCapPercentageBTC}%</div>
              <div className="h-2 w-20 bg-base">
                <div
                  className="bg-primary min-h-2"
                  style={{ width: `${marketCapPercentageBTC}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="mx-4 text-second flex items-center justify-center">
                <div>ETH {marketCapPercentageETH}%</div>
                <div>
                  <div className="min-h-2 w-20 bg-base">
                    <div
                      style={{ width: `${marketCapPercentageETH}%` }}
                      className="bg-primary min-h-2 max-w-32"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div className="bg-second">
          <div className="flex justify-between items-center w-screen  ">
            <div className="flex justify-between min-w-fit ml-5">
              <div className="m-5">Logo Area</div>
              <Link href="/" className="m-5 ">
                Home
              </Link>
              <Link href="/Portfolio" className="m-5">
                Portfolio
              </Link>
            </div>

            <div className="mr-5">
              <input
                value={searchValue ?? ""}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Search..."
                type="text"
                className="m-5"
              />

              <select
                onChange={(e) => handleCurrency(e)}
                name="currency"
                className="m-5"
              >
                {/* //how to also change currency symbol at the same time? with an object with both? */}
                <option value="USD">$USD</option> 
                <option value="Eur">Euro</option>
              </select>
            </div>
          </div>
          
        </div>
      </nav>
    </>
  );
}
