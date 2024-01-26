"use client";
import Link from "next/link";

import { useState } from "react";
import aveta from "aveta";
import styled from "styled-components";

const Bar = styled.div`
  width: 16%;
`;

export default function Navigation({ darkMode, barData }) {
  const [currency, setCurrency] = useState("usd");

  const marketCoins = barData?.data.active_cryptocurrencies;
  const totalVolume = Math.floor(barData?.data?.total_volume?.usd);
  const totalMarketCap = Math.floor(barData?.data?.total_market_cap.usd);
  const marketCapPercentageBTC = barData?.data?.market_cap_percentage?.btc.toFixed(
    2
  );
  const marketCapPercentageETH = barData?.data?.market_cap_percentage?.eth.toFixed(
    2
  );

  const width = marketCapPercentageETH / 100;

  console.log("matcoins", barData, width, marketCapPercentageETH);
  return (
    <>
      <nav className="flex items-center flex-col">
        <div className="flex justify-between items-center w-screen  ">
          <div className="flex justify-between min-w-fit ml-5">
            <div className="m-5">Logo Area</div>
            <Link href="/" className="m-5">
              Home
            </Link>
            <Link href="/Portfolio" className="m-5">
              Portfolio
            </Link>
          </div>

          <div className="mr-5">
            <input placeholder="Search..." type="text" className="m-5"></input>
            <select name="currency" className="m-5">
              <option value="USD">$USD</option>
              <option value="Euro">Euro</option>
            </select>
            <button>Theme</button>
          </div>
        </div>
        <div className="flex  ">
          <div className="m-4">Coins:{marketCoins}</div>
          <div className="m-4">{totalVolume && aveta(totalVolume)}</div>
          <div className="m-4">{totalMarketCap && aveta(totalMarketCap)}</div>

          <div className="m-4  flex items-center justify-center">
            <div>BTC {marketCapPercentageBTC}%</div>
            <div className="h-2 w-20 bg-gray-900">
              <div
                className="bg-blue-200 min-h-2"
                style={{ width: `${marketCapPercentageBTC}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="m-4  flex items-center justify-center">
              <div>ETH {marketCapPercentageETH}%</div>
              <div>
                <div className="min-h-2 w-20 bg-gray-900">
                  <div
                    style={{ width: `${marketCapPercentageETH}%` }}
                    className="bg-blue-200 min-h-2 max-w-32"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
