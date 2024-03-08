"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  useGetAllCoinsQuery,
  useGetTopBarInfoQuery,
} from "@/app/Providers/api/apiSlice";
import aveta from "aveta";
import { useRouter } from "next/navigation";
import { useCrypto } from "../Providers/CryptoProvider";
import { CurrencyArray } from "./Currencies";
import { MoonIcon, SunIcon } from "../icons/Icons";
import { DropDownRow } from "../utils/DropDownRow";
import Palettes from "../utils/Palettes";

export default function Navigation() {
  const { data: allCoinsData, or, isError, isLoading } = useGetAllCoinsQuery({
    currency: "usd",
    sortValue: "volume_desc",
  });

  const { data: barData } = useGetTopBarInfoQuery();

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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const marketCoins = barData?.data?.active_cryptocurrencies;
  const totalVolume = Math.floor(barData?.data?.total_volume?.usd);
  const totalMarketCap = Math.floor(barData?.data?.total_market_cap.usd);
  const marketCapPercentageBTC = barData?.data?.market_cap_percentage?.btc.toFixed(
    2
  );
  const marketCapPercentageETH = barData?.data?.market_cap_percentage?.eth.toFixed(
    2
  );
  const resultContainer = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setShowResults(true);
    setSearchValue(inputValue);
  };

  const handleSearch = (coinId) => {
    if (searchValue) {
      const fixString = coinId.replace(/\W+/g, "-");
      setSearchValue("");
      return router.push(`/coininfo/${fixString}`);
    }
    if (!searchValue) return resetSearchComplete();
  };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
  }, []);

  useEffect(() => {
    if (!resultContainer.current) return;
    resultContainer.current.scrollIntoView({
      block: "center",
    });
  }, [focusedIndex]);

  const handleKeyPress = (e: { key: any }) => {
    const { key } = e;
    let nextIndexCount = 0;
    if (key === "ArrowDown") nextIndexCount = focusedIndex + 1;
    if (key === "ArrowUp") nextIndexCount = focusedIndex - 1;
    if (e.key === "Enter") return handleSelection(focusedIndex);
    setFocusedIndex(nextIndexCount);
  };

  const filteredCoinsArray = allCoinsData?.filter((coin) => {
    const name = coin.name.toLowerCase();
    const search = searchValue.toLowerCase();
    return name.startsWith(search);
  });

  const mappedCoinsArray = filteredCoinsArray?.map((coin, index) => (
    <DropDownRow
      key={coin.id}
      ref={index === focusedIndex ? resultContainer : null}
      className={`
    cursor-pointer
    hover:bg-slate-200
     ${focusedIndex === index ? "active bg-slate-200" : "bg-white"}`}
      onMouseDown={() => handleSelection(index)}
      onBlur={resetSearchComplete}
    >
      {coin.name}
    </DropDownRow>
  ));

  const handleSelection = (selectedIndex: number) => {
    const selectedItem = filteredCoinsArray[selectedIndex];
    setSearchValue(selectedItem.id);
    if (!selectedItem) return resetSearchComplete();
    handleSearch(selectedItem.key);
    resetSearchComplete();
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
                <div>
                  <input
                    value={searchValue ?? ""}
                    onBlur={resetSearchComplete}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Search..."
                    type="text"
                    className="ml-5 drop-shadow-xl rounded-lg pl-3 relative w-44 inline-block focus: border-slate-200"
                  />
                  <div className="ml-5 absolute max-h-44 overflow-y-auto w-44">
                    {showResults && mappedCoinsArray}
                  </div>
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
                  {Palettes?.map((theme) => {
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
