"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import aveta from "aveta";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { RadioGroup, Switch } from "@headlessui/react";

const Bar = styled.div`
  width: 16%;
`;

const colors = ["green", "red", "blue"];
const modes = ["light", "dark"];

function useStickyState(
  defaultValue: string | undefined,
  key: string
): [string | undefined, (v: string) => void] {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    const stickyValue = localStorage.getItem(key);
    if (stickyValue !== null) {
      setValue(stickyValue);
    }
  }, [key, setValue]);

  return [
    value,
    (v) => {
      localStorage.setItem(key, v);
      setValue(v);
    },
  ];
}

export default function Navigation() {
  const [currency, setCurrency] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [barData, setBarData] = useState<{data: any}>({});
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useStickyState(colors[0], "theme-color");
  const [mode, setMode] = useStickyState(modes[0], "theme-mode");
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

  const getBarInfo = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(`https://api.coingecko.com/api/v3/global`);
      setBarData(data);
      console.log("bardata", data);
      setIsLoading(false);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBarInfo();
  }, []);

  function handleCurrency(e) {
    setCurrency(e.target.value);
    console.log("currency", currency);
  }

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
  };

  const handleSearch = (e) => {
    if (searchValue) return router.push(`/pages/cardinfo/${searchValue}`);
    if (!searchValue) {
      return router.push("/");
    }
    console.log("search", searchValue);
  };

  const handleKeyPress = (event: { key: any }) => {
    if (event.key === "Enter") return handleSearch(e);
  };

  return (
    <>
      <nav
        className={[
          "flex bg-primaryBg flex-col",
          color && `theme-${color}`,
          color && `theme-${mode}`,
        ]
          .filter(Boolean)
          .join(" ")}
      >
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
              <option value="USD">$USD</option>
              <option value="Euro">Euro</option>
            </select>

            <div className="flex">
              <div >
             
                <RadioGroup value={color} onChange={setColor}>
                  <RadioGroup.Label className="mt-5 block">
                    Select a color:
                  </RadioGroup.Label>
                  <div className="mt-2 flex justify-between space-x-8">
                    {colors.map((c) => {
                      return (
                        <RadioGroup.Option
                          className="ui-checked:text-onPrimaryBg ui-checked:bg-primaryBg ui-checked:ring-primary ui-not-checked:ring-onNeutralBg flex h-20 w-full cursor-pointer items-center justify-center font-bold uppercase ring-4"
                          value={c}
                          key={c}
                        >
                          {c}
                        </RadioGroup.Option>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>

              <div>
                 <Switch.Group>
                  <div className="mt-10">
                    <Switch.Label className="block">
                      Enable dark mode:
                    </Switch.Label>
                    <Switch
                      className="bg-onNeutralBg relative inline-flex h-6 w-11 items-center rounded-full"
                      checked={mode === "dark"}
                      onChange={() =>
                        setMode(mode === "light" ? "dark" : "light")
                      }
                    >
                      <span className="bg-neutralBg ui-not-checked:translate-x-1 ui-checked:translate-x-6 inline-block h-4 w-4 transform rounded-full transition" />
                    </Switch>
                  </div>
                </Switch.Group>
              </div>
            </div>
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
