"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback, Key } from "react";
import {
  useGetAllCoinsQuery,
  useGetTopBarInfoQuery,
} from "@/app/Providers/api/apiSlice";
import aveta from "aveta";
import { useRouter } from "next/navigation";
import { useCrypto } from "../Providers/CryptoProvider";
import { CurrencyArray } from "../constants/Currencies";
import {
  CalculatorIcon,
  CoinStackIcon,
  HomeIcon,
  MoonIcon,
  SearchIcon,
  StackIcon,
  SunIcon,
} from "../icons/Icons";
import { DropDownRow } from "../constants/DropDownRow";
import { Palettes } from "../constants/Palettes";
import { changeCurr } from "@/redux/currency/currencySlice";
import { useAppDispatch } from "@/redux/hooks";
import { useAppSelector } from "@/redux/hooks";
import { useAuth, logout } from "../firebase/config";
import Image from "next/image";

export default function Navigation() {
  const currency = useAppSelector((state) => state.currency);

  const { data: allCoinsData, isError, isLoading } = useGetAllCoinsQuery({
    currency: currency.currency,
    sortValue: "volume_desc",
  });

  const { data: barData } = useGetTopBarInfoQuery("");
  const dispatch = useAppDispatch();
  const currentUser: any = useAuth();
  const {
    handlePalette,
    handleMode,
    palette,
    mode,
    converter,
    handleConverter,
  } = useCrypto();
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

  const handleChange = (e: { target: { value: string } }) => {
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

  const filteredCoinsArray = allCoinsData?.filter((coin: { name: string }) => {
    const name = coin.name.toLowerCase();
    const search = searchValue.toLowerCase();
    return name.startsWith(search);
  });

  const mappedCoinsArray = filteredCoinsArray?.map(
    (coin: { id: Key | null | undefined; name: string }, index: number) => (
      <DropDownRow
        key={coin.id}
        ref={index === focusedIndex ? resultContainer : null}
        className={`
    cursor-pointer text-shadowDark bg-second
    hover:bg-shadowDark hover:text-shadowLight
     ${
       focusedIndex === index
         ? "active text-shadowLight bg-shadowDark"
         : "text-shadowDark bg-second"
     }`}
        onMouseDown={() => handleSelection(index)}
        onBlur={resetSearchComplete}
      >
        {coin.name}
      </DropDownRow>
    )
  );

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

  const handleCurrency = (e: { target: { value: any } }) => {
    const value = e.target.value;
    const newCurrency = CurrencyArray.find((c) => c.currency === value);
    dispatch(
      changeCurr({
        currency: newCurrency?.currency,
        symbol: newCurrency?.symbol,
        name: newCurrency?.name,
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
        <div className="fixed top-0 z-50 w-full h-5 flex items-center justify-center py-0.5 text-xs bg-navColor">
          <div className="hidden sm:flex items-center mx-4 ">
            <CoinStackIcon />
            Active Coins:{marketCoins}
          </div>
          <div className="mx-4 hidden sm:inline ">
            Total Volume: {currency.symbol}
            {totalVolume && aveta(totalVolume)}
          </div>
          <div className="mx-4 text-xs hidden sm:inline">
            Total Market Cap:
            {currency.symbol}
            {totalMarketCap && aveta(totalMarketCap)}
          </div>

          <div className="mx-4  flex items-center justify-center">
            <Image
              src="https://i.ibb.co/VpjD7V6/Bitcoin-svg.png"
              className="h-4 w-4"
              alt="Bitcoin Icon"
              width={16}
            />{" "}
            <div>
              <span className="hidden sm:inline">BTC</span>{" "}
              {marketCapPercentageBTC}%
            </div>
            <div
              className={`h-2 w-16 sm:w-20 ${
                mode === "dark" ? "bg-shadowDark" : "bg-second"
              }`}
            >
              <div
                className="bg-accent min-h-2"
                style={{ width: `${marketCapPercentageBTC}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="mx-4 flex items-center justify-center">
              <Image
                src="https://i.ibb.co/3Spb2vB/Ethereum-icon-purple-svg.png"
                className="h-4 w-4"
                alt="Eth Icon"
                width={16}
              />{" "}
              <div>
                <span className="hidden sm:inline">ETC</span>{" "}
                {marketCapPercentageETH}%
              </div>
              <div>
                <div
                  className={`h-2 w-16 sm:w-20 ${
                    mode === "dark" ? "bg-shadowDark" : "bg-second"
                  }`}
                >
                  <div
                    style={{ width: `${marketCapPercentageETH}%` }}
                    className="bg-accent min-h-2"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-second text-sm fixed top-5 z-50 w-full">
          <div className="flex justify-between items-center w-full  ">
            <div className="flex justify-between items-center min-w-fit sm:ml-5">
              <div className="mx-2 drop-shadow-md">
                <Link
                  href="/"
                  className="flex items-center sm:mx-2 drop-shadow-md text-accent hover:scale-105"
                >
                  {mode === "dark" ? (
                    <Image
                      src="https://i.ibb.co/9py9W2V/site-Logo-Purple-2.png"
                      alt="logo"
                      className="h-16"
                      height={64}
                    />
                  ) : (
                    <Image
                      src="https://i.ibb.co/Z22x96J/site-Logo-Purple-1.png"
                      alt="logo"
                      className="h-16"
                      height={64}
                    />
                  )}
                </Link>
              </div>
              <Link
                href="/"
                className="hidden sm:flex items-center mx-2 drop-shadow-md text-shadowDark hover:scale-105"
              >
                <HomeIcon />
                <p className="ml-2">Home</p>
              </Link>
              <Link
                href="/portfolio"
                className="hidden sm:flex items-center mx-2 drop-shadow-md text-shadowDark hover:scale-105"
              >
                <StackIcon />
                <p className="ml-2 hidden sm:inline">Portfolio</p>
              </Link>
            </div>
            <div className="flex flex-col content-evenly">
              <div>
                {currentUser ? (
                  <div className="flex justify-end items-center my-1 mr-5">
                    <div className="hidden sm:inline text-shadowDark italic">
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
                      className="hidden sm:inline drop-shadow-md text-accent mx-2 hover:scale-105"
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
                    className="items-center h-6 text-sm sm:ml-5 drop-shadow-xl rounded-lg pl-3 relative w-[70px] sm:w-44 inline-block bg-base text-shadowDark placeholder:text-sm placeholder:text-shadowDark focus:border-slate-200"
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
                  className="items-center h-6 text-sm sm:mx-5 drop-shadow-xl rounded-lg p-0.5 bg-second border-base text-shadowDark"
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
                      </option>
                    );
                  })}
                </select>
                <select
                  onChange={(e) => handlePalette(e)}
                  name="palette"
                  className="hidden sm:inline h-6 mr-5 drop-shadow-xl text-sm rounded-lg bg-base text-shadowDark"
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
        <div className="sm:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-second ">
          <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium  bg-second">
            <Link
              href="/"
              className="inline-flex flex-col items-center justify-center px-5 drop-shadow-md text-shadowDark hover:scale-105"
            >
              <HomeIcon />
              <span className="text-sm text-shadowDark">
                <p className="text-sm">Home</p>
              </span>{" "}
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex flex-col items-center justify-center px-5 drop-shadow-md text-shadowDark hover:scale-105"
            >
              <StackIcon />
              <p className="text-sm">Portfolio</p>
            </Link>
            <Link
              href="/"
              onClick={handleConverter}
              className="inline-flex flex-col items-center justify-center px-5 drop-shadow-md text-shadowDark hover:scale-105"
            >
              <CalculatorIcon />
              <span className="text-sm text-shadowDark ">
                <p className="text-sm">Converter</p>
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
