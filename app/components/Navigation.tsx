"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  useGetAllCoinsQuery,
  useGetTopBarInfoQuery,
} from "@/app/Providers/api/apiSlice";
import aveta from "aveta";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useCrypto } from "../Providers/CryptoProvider";
import { CurrencyArray } from "./Currencies";
import { MoonIcon, SunIcon } from "../icons/Icons";

const DropdownRow = styled.div`
  cursor: pointer;
  text-align: start;
  margin: 2px, 0;
  position: relative;
  z-index: 1;
`;

const palettes = [
  { theme: "Basic", class: "bg-slate-200 text-indigo-900 font-medium" },
  { theme: "Teal", class: "bg-teal-100 text-teal-900 font-medium" },
  { theme: "Neon-Pastel", class: "bg-yellow-100 text-green-900 font-medium" },
  { theme: "Amber", class: "bg-amber-50 text-amber-900 font-medium" },
  { theme: "Rose", class: "bg-rose-50 text-rose-900 font-medium" },
];
const modes = ["light", "dark"];

export default function Navigation() {
  const { data: allCoinsData, error, isError, isLoading } = useGetAllCoinsQuery(
    {
      currency: "usd",
      sortValue: "volume_desc",
    }
  );

  const { data: barData } = useGetTopBarInfoQuery();

  const [searchSelect, setSearchSelect] = useState({ cursor: 0, result: [] });

  function handleKeyDown(e) {
    const { cursor, result } = searchSelect;
    if (e.keyCode === 38 && cursor > 0) {
      setSearchSelect((prevState) => ({
        cursor: prevState.cursor - 1,
      }));
    } else if (e.keyCode === 40 && cursor < result.length - 1) {
      setSearchSelect((prevState) => ({
        cursor: prevState.cursor + 1,
      }));
    }
  }

  const {
    handleCurrency,
    handleSignOut,
    user,
    handlePalette,
    handleMode,
    palette,
    mode,
  } = useCrypto();
  const [searchValue, setSearchValue] = useState("");
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
      <nav
        className={`flex flex-col justify-center fixed top-0 z-50 theme-${palette} theme-${mode}`}
      >
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
            <div className="flex flex-col content-evenly">
              <div className="flex justify-end items-center my-1 mr-5">
                {user && (
                  <div className="text-accent italic">
                    Currently signed in under{" "}
                    <span className="text-accent2">{user?.email}</span>
                  </div>
                )}
                <Link
                  href="/sign-in"
                  className="drop-shadow-md text-accent mx-2 hover:scale-105"
                >
                  Sign-in
                </Link>
                <Link
                  href="/sign-up"
                  className="drop-shadow-md text-accent mx-2 hover:scale-105"
                >
                  Sign-up
                </Link>
                {user && (
                  <Link href="/">
                    <button
                      className="drop-shadow-md text-accent mx-2 hover:scale-105"
                      onClick={handleSignOut}
                    >
                      Log out
                    </button>
                  </Link>
                )}
              </div>
              <div className="flex justify-end items-center my-1">
                <input
                  value={searchValue ?? ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Search..."
                  type="text"
                  className="ml-5 drop-shadow-xl rounded-lg pl-3"
                />
                <div className="absolute">
                  {searchValue &&
                    allCoinsData
                      ?.filter((coin) => {
                        const name = coin.name.toLowerCase();
                        const search = searchValue.toLowerCase();
                        return name.startsWith(search);
                      })
                      .map((coin) => {
                        <div key={coin.id} className="border-slate-300">
                          <DropdownRow
                            key={coin.id}
                            className="bg-second"
                            onClick={() => handleSearch(coin.id)}
                          >
                            {coin.name}
                          </DropdownRow>
                        </div>;
                      })}
                </div>
                <select
                  onChange={(e) => handleCurrency(e)}
                  name="currency"
                  className="mx-5 drop-shadow-xl rounded-lg "
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

                <select
                  onChange={(e) => handlePalette(e)}
                  name="palette"
                  className="mr-5 drop-shadow-xl rounded-lg"
                >
                  {palettes?.map((theme) => {
                    return (
                      <option
                        className={theme.class}
                        key={theme.theme}
                        value={theme.theme}
                      >
                        {theme.theme}
                      </option>
                    );
                  })}
                </select>

                {mode === "light" ? (
                  <button
                    className="mr-5 my-5 border-accent"
                    value="dark"
                    onClick={() => handleMode("dark")}
                  >
                    <MoonIcon />
                  </button>
                ) : (
                  <button
                    className="mr-5 border-accent"
                    value="light"
                    onClick={() => handleMode("light")}
                  >
                    <SunIcon />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
