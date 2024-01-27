"use client";


import Link from "next/link";
import { useState, useEffect, ChangeEvent } from "react";
import aveta from "aveta";
import styled from "styled-components";
import { useRouter } from 'next/navigation'

const Bar = styled.div`
  width: 16%;
`;

export default function Navigation({ darkMode }) {
  const [currency, setCurrency] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [barData, setBarData] = useState({});
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
    if (!searchValue){ return router.push("/")};
    console.log("search", searchValue)
  };

  const handleKeyPress = (event: { key: any }) => {
    if (event.key === "Enter") return handleSearch();
  };


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
            <input
              value={searchValue ?? ""}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              placeholder="Search..."
              type="text"
              className="m-5"
            /><button onClick={(e)=> router.push(`/pages/cardinfo/${searchValue}`)}>submit test</button>
            <select
              onChange={(e) => handleCurrency(e)}
              name="currency"
              className="m-5"
            >
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
