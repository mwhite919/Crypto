"use client";

import { useState, useEffect } from "react";
import { useGetAllCoinsQuery } from "./Providers/api/apiSlice";
import { useCrypto } from "./Providers/CryptoProvider";
import { useAppSelector } from "@/redux/hooks";
import CoinRow from "./components/CoinRow";
import ChartsMain from "./components/ChartsMain";
import Converter from "./components/Converter";
import styled from "styled-components";
import { RadioGroup } from "@headlessui/react";
import { CoinSwiper } from "@/app/components/CoinSwiper";
import InfiniteScroll from "react-infinite-scroll-component";

const Row = styled.div`
  width: 1010px;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
`;

export default function Page() {
  const currency = useAppSelector((state) => state.currency);
  const { palette, mode } = useCrypto();
  const [converter, setConverter] = useState(false);
  const [sortValue, setSortValue] = useState("market_cap_desc");
  const [sortByVolume, setSortByVolume] = useState(true);
  const [sortByMarketCap, setSortByMarketCap] = useState(false);
  const [sortById, setSortById] = useState(false);
  const [sortByPrice, setSortByPrice] = useState(false);

  const { data: allCoinsData, error, isError, isLoading } = useGetAllCoinsQuery(
    {
      currency: currency.currency,
      sortValue: sortValue,
    }
  );

  const handleSort = (value) => {
    setSortValue(value);
    if (value === "volume") {
      setSortByVolume(!sortByVolume);
      if (sortByVolume) {
        setSortValue("volume_desc");
      } else {
        setSortValue("volume_asc");
      }
    }
    if (value === "marketcap") {
      setSortByMarketCap(!sortByMarketCap);
      if (sortByMarketCap) {
        setSortValue("market_cap_desc");
      } else {
        setSortValue("market_cap_asc");
      }
    }
    if (value === "id") {
      setSortById(!sortById);
      if (sortById) {
        setSortValue("id_desc");
      } else {
        setSortValue("id_asc");
      }
    }
    if (value === "price") {
      setSortByPrice(!sortByPrice);
      if (sortByPrice) {
        setSortValue("price_desc");
      } else {
        setSortValue("price_asc");
      }
    }
  };

  return (
    <div
      className={`bg-base flex justify-center items-center flex-col pt-24 theme-${palette} theme-${mode} top-36`}
    >
      <div>
        <div>{isLoading && <h2>fetching data...</h2>}</div>
        <div>{error && <h2>page loading</h2>}</div>
      </div>
      <div>
        <RadioGroup
          className="flex items-center justify-center mx-5 text-sm "
          value={converter}
          onChange={setConverter}
        >
          <RadioGroup.Option
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 hover:scale-105"
                  : ""
              }
                      ${
                        checked
                          ? "bg-accent text-white"
                          : "bg-white text-accent"
                      }
                        relative flex cursor-pointer rounded-lg px-3 py-2 w-36 m-1 justify-center shadow-md focus:outline-none hover:scale-105`
            }
            value={false}
          >
            {({ checked }) => <span className={checked && ""}>Coins</span>}
          </RadioGroup.Option>
          <RadioGroup.Option
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 hover:scale-105"
                  : ""
              }
                      ${
                        checked
                          ? "bg-accent text-white"
                          : "bg-white text-accent"
                      }
                        relative flex cursor-pointer rounded-lg px-3 py-2 m-1 w-36 justify-center shadow-md focus:outline-none hover:scale-105`
            }
            value={true}
          >
            {({ checked }) => <span className={checked && ""}>Converter</span>}
          </RadioGroup.Option>
        </RadioGroup>
      </div>
      <div>
        {converter ? (
          <Converter allCoinsData={allCoinsData} />
        ) : (
          <div>
            <ChartsMain />
          </div>
        )}
      </div>
      <div>
        <Row className="bg-second flex shadow-md text-sm">
          <div
            className="flex items-center justify-center"
            style={{ width: 80 }}
          >
            #
          </div>
          <div style={{ width: 100 }}></div>
          <div
            className="flex justify-start items-center"
            style={{ width: 250 }}
          >
            Name
          </div>
          <div
            className="flex justify-start items-center"
            style={{ width: 250 }}
          >
            Price
          </div>
          <div
            className="flex justify-start items-center"
            style={{ width: 150 }}
          >
            1h%
          </div>
          <div
            className="flex justify-start items-center"
            style={{ width: 150 }}
          >
            24hr%
          </div>
          <div
            className="flex justify-start items-center"
            style={{ width: 150 }}
          >
            7d%
          </div>
          <div
            className="flex justify-start items-center"
            style={{ width: 250 }}
          >
            24h Volume/<br></br>Market Cap
          </div>
          <div style={{ width: 250 }}>
            Circulating/<br></br> Total Supply
          </div>
          <div className="ml-4">Last 7d</div>
        </Row>
      </div>

      <div>
        {allCoinsData?.map((coin, index) => (
          <div key={coin.id}>
            <CoinRow coin={coin} index={index + 1} />
          </div>
        ))}
      </div>
    </div>
  );
}
