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
import {
  CoinStackIcon,
  HomeIcon,
  MoonIcon,
  StackIcon,
  SunIcon,
} from "../icons/Icons";
import { DropDownRow } from "../constants/DropDownRow";
import { Palettes } from "../constants/Palettes";
import { changeCurr } from "@/redux/currency/currencySlice";
import { useAppDispatch } from "@/redux/hooks";
import { useAppSelector } from "@/redux/hooks";
import { useAuth, logout } from "../firebase/config";

export default function Navigation() {
  const currency = useAppSelector((state) => state.currency);

  const { data: allCoinsData, isError, isLoading } = useGetAllCoinsQuery({
    currency: currency.currency,
    sortValue: "volume_desc",
  });

  const { data: barData } = useGetTopBarInfoQuery();
  const dispatch = useAppDispatch();
  const currentUser = useAuth();
  const { handlePalette, handleMode, palette, mode } = useCrypto();
  const [searchValue, setSearchValue] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const marketCoins = barData?.data?.active_cryptocurrencies;
  const totalVolume = Math.floor(
    parseInt(barData?.data?.total_volume[currency.currency])
  );
  const totalMarketCap = Math.floor(
    barData?.data?.total_market_cap[currency.currency]
  );
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

  const handleSearch = (coinId: string) => {
    if (searchValue) {
      const fixString = coinId?.replace(/\W+/g, "-");
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
    if (selectedItem === undefined) {
      setTimeout(() => {
        setSearchError(false);
      }, 3000);
      setSearchError(true);
      return;
    }
    setSearchValue(selectedItem.id);
    if (!selectedItem) return resetSearchComplete();
    handleSearch(selectedItem.id);
    resetSearchComplete();
  };

  const handleCurrency = (e) => {
    const value = e.target.value;
    const newCurrency = CurrencyArray.find((c) => c.currency === value);
    dispatch(
      changeCurr({
        currency: newCurrency.currency,
        symbol: newCurrency.symbol,
        name: newCurrency.name,
      })
    );
  };

  return (
    <>
      <nav
        className={`flex flex-col justify-center fixed top-0 z-50 text-navText theme-${palette} theme-${mode}`}
      >
        {isLoading && <div className="w-full h-full cursor-wait"></div>}
        {isError && (
          <div>
            An error occured during loading. Please refresh your page and try
            again.
          </div>
        )}
        <div className="flex items-center justify-center p-px text-xs bg-navColor">
          <div className=" flex items-center mx-4 ">
            <CoinStackIcon />
            Active Coins:{marketCoins}
          </div>
          <div className="mx-4 ">
            Total Volume: {currency.symbol}
            {totalVolume && aveta(totalVolume)}
          </div>
          <div className="mx-4 ">
            Total Market Cap: {currency.symbol}
            {totalMarketCap && aveta(totalMarketCap)}
          </div>

          <div className="mx-4  flex items-center justify-center">
            <img
              src="https://i.ibb.co/VpjD7V6/Bitcoin-svg.png"
              className="h-4 w-4"
            />{" "}
            <div>BTC {marketCapPercentageBTC}%</div>
            <div
              className={`min-h-2 w-20 ${
                mode === "dark" ? "bg-shadowDark" : "bg-second"
              }`}
              git
            >
              <div
                className="bg-accent min-h-2"
                style={{ width: `${marketCapPercentageBTC}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="mx-4  flex items-center justify-center">
              <img
                src="https://i.ibb.co/3Spb2vB/Ethereum-icon-purple-svg.png"
                className="h-4 w-4"
              />{" "}
              <div>ETH {marketCapPercentageETH}%</div>
              <div>
                <div
                  className={`min-h-2 w-20 ${
                    mode === "dark" ? "bg-shadowDark" : "bg-second"
                  }`}
                >
                  <div
                    style={{ width: `${marketCapPercentageETH}%` }}
                    className="bg-accent min-h-2 max-w-32"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-second text-sm">
          <div className="flex justify-between items-center w-screen  ">
            <div className="flex justify-between items-center min-w-fit ml-5">
              <div className="mx-2 drop-shadow-md">
                <Link
                  href="/"
                  className="flex items-center mx-2 drop-shadow-md text-accent hover:scale-105"
                >
                  {" "}
                  <img src="https://i.ibb.co/RBwgfPy/Logo.png" alt="logo"></img>
                </Link>
              </div>
              <Link
                href="/"
                className="flex items-center mx-2 drop-shadow-md text-shadowDark hover:scale-105"
              >
                <HomeIcon />
                <p className="ml-2">Home</p>
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center mx-2 drop-shadow-md text-shadowDark hover:scale-105"
              >
                <StackIcon />
                <p className="ml-2">Portfolio</p>
              </Link>
            </div>
            <div className="flex flex-col content-evenly">
              <div>
                {currentUser ? (
                  <div className="flex justify-end items-center my-1 mr-5">
                    <div className="text-shadowDark italic">
                      User:{" "}
                      <span className="text-accent2">{currentUser?.email}</span>
                    </div>
                    <Link href="/">
                      <button
                        className="drop-shadow-md text-accent mx-2 hover:scale-105"
                        onClick={() => logout()}
                      >
                        Log out
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex justify-end items-center my-1 mr-5">
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
                  </div>
                )}
              </div>
              <div className="flex justify-end items-center mb-2 ">
                <div>
                  <input
                    value={searchValue ?? ""}
                    onBlur={resetSearchComplete}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Search..."
                    type="text"
                    className="items-center h-6 text-sm ml-5 drop-shadow-xl rounded-lg pl-3 relative w-44 inline-block bg-base text-shadowDark placeholder:text-sm placeholder:text-shadowDark focus:border-slate-200"
                  />{" "}
                  {searchError && (
                    <p className="text-xs text-shadowDark pt-[2px]">
                      Search invalid. Please check and try again.
                    </p>
                  )}
                  <div className="ml-5 absolute max-h-44 overflow-y-auto w-44">
                    {showResults && mappedCoinsArray}
                  </div>
                </div>
                <select
                  name="currency"
                  className="items-center h-6 text-sm mx-5 drop-shadow-xl rounded-lg p-0.5 bg-second border-base text-shadowDark"
                  onChange={handleCurrency}
                >
                  {CurrencyArray?.map((c) => {
                    return (
                      <option
                        className="text-sm text-shadowDark"
                        key={c.currency}
                        value={c.currency}
                      >
                        {c.currency}
                        {"  "} {c.name}
                      </option>
                    );
                  })}
                </select>
                <select
                  onChange={(e) => handlePalette(e)}
                  name="palette"
                  className=" h-6 mr-5 drop-shadow-xl text-sm rounded-lg bg-base text-shadowDark"
                >
                  <option className="bg-second text-shadowDark text-sm">
                    Theme
                  </option>
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
                    className="mr-5  border-accent"
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
