"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import aveta from "aveta";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useCrypto } from "../Providers/CryptoProvider";
import { CurrencyArray } from "./Currencies";

const DropdownRow = styled.div`
  cursor: pointer;
  text-align: start;
  margin: 2px, 0;
  position: relative;
  z-index: 1;
`;

export default function Navigation() {
  const { getBarInfo, handleCurrency, barData, currentCoins } = useCrypto();
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const marketCoins = barData?.data?.active_cryptocurrencies;
  const totalVolume = Math.floor(barData?.data?.total_volume?.usd);
  const totalMarketCap = Math.floor(barData?.data?.total_market_cap.usd);
  const marketCapPercentageBTC = barData?.data?.market_cap_percentage?.btc.toFixed(
    2
  );
  const marketCapPercentageETH = barData?.data?.market_cap_percentage?.eth.toFixed(
    2
  );

  const router = useRouter();

  useEffect(() => {
    getBarInfo();
  }, []);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
  };

  const handleSearch = (coinId) => {
    if (searchValue) {
      setSearchValue("");
      const fixString = coinId.replace(/\W+/g, "-");
      return router.push(`/coininfo/${fixString}`);
    }
    if (!searchValue) {
      return router.push("/");
    }
  };

  const handleKeyPress = (e: { key: any }) => {
    if (e.key === "Enter") return handleSearch(searchValue);
  };

  return (
    <>
      <nav className="flex flex-col justify-center fixed top-0 z-50 ">
        <div className="flex items-center justify-center bg-accent ">
          <div className="mx-4 text-second">Coins:{marketCoins}</div>
          <div className="mx-4 text-second">
            {totalVolume && aveta(totalVolume)}
          </div>
          <div className="mx-4 text-second">
            {totalMarketCap && aveta(totalMarketCap)}
          </div>

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
            <div className="flex justify-between items-center min-w-fit ml-5">
              <div className="m-5 drop-shadow-md">
                <img src="https://i.ibb.co/RBwgfPy/Logo.png" alt="logo"></img>
              </div>
              <Link
                href="/"
                className="m-5 drop-shadow-md text-accent hover:scale-105"
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                className="m-5 drop-shadow-md text-accent hover:scale-105"
              >
                Portfolio
              </Link>
            </div>

            <div className="mr-5 flex flex-col ">
              <div className="flex justify-end items-center m-0">
                <Link
                  href="/sign-up"
                  className="m-5 drop-shadow-md text-accent hover:scale-105"
                >
                  Sign-up
                </Link>
                <Link
                  href="/sign-in"
                  className="m-5 drop-shadow-md text-accent hover:scale-105"
                >
                  Sign-in
                </Link>
              </div>
              <div className="flex justify-end items-center">
                <input
                  value={searchValue ?? ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Search..."
                  type="text"
                  className="m-5 drop-shadow-md rounded-sm pl-3"
                />
                <div className="absolute">
                  {searchValue &&
                    currentCoins?.map((coin) => {
                      const name = coin.name.toLowerCase();
                      const search = searchValue.toLowerCase();
                      if (name.startsWith(search))
                        return (
                          <div key={coin.id} className="border-slate-300">
                            <DropdownRow
                              key={coin.id}
                              className="bg-second"
                              onClick={() => handleSearch(coin.id)}
                            >
                              {coin.name}
                            </DropdownRow>
                          </div>
                        );
                    })}
                </div>

                <select
                  onChange={(e) => handleCurrency(e)}
                  name="currency"
                  className="m-5 drop-shadow-md rounded-sm "
                >
                  <option>here</option>
                  {CurrencyArray?.map((currency) => {
                    return (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}