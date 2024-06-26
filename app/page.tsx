"use client";

import { useState } from "react";
import { useGetAllCoinsQuery } from "./Providers/api/apiSlice";
import { useCrypto } from "./Providers/CryptoProvider";
import { useAppSelector } from "@/redux/hooks";
import CoinRow from "./components/CoinRow";
import ChartsMain from "./components/ChartsMain";
import Converter from "./components/Converter";
import styled from "styled-components";
import { RadioGroup } from "@headlessui/react";
import { CoinType } from "./sharedinterfaces";

const Row = styled.div`
  width: 1010px;
  height: 50px;
  border-radius: 10px;
  @media (max-width: 600px) {
    width: 300px;
    padding: 6px;
    margin-top: 12px;
  }
`;
export default function Page() {
  const currency = useAppSelector((state) => state.currency);
  const { palette, mode, converter, handleConverter } = useCrypto();

  const { data: allCoinsData, isError, isLoading } = useGetAllCoinsQuery({
    currency: currency.currency,
    sortValue: "market_cap_desc",
  });

  return (
    <>
      <div
        className={`bg-base flex justify-center items-center flex-col text-shadowDark pt-24 theme-${palette} theme-${mode} top-36 * ${
          isLoading && "cursor-wait"
        }`}
      >
        <div>
          <div>{isLoading && <h2>fetching data...</h2>}</div>
          <div>
            {isError && (
              <h2>An error occured while loading. Please try again.</h2>
            )}
          </div>
        </div>
        <div>
          <RadioGroup
            className="flex items-center justify-center mx-5 text-sm "
            value={converter}
            onChange={handleConverter}
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
                          ? "border-2 border-shadowLight bg-accent text-second hover:scale-105"
                          : "bg-second text-shadowDark hover:scale-105"
                      }
                        relative flex cursor-pointer rounded-lg px-3 py-2 w-36 m-1 justify-center shadow-md focus:outline-none hover:scale-105`
              }
              value={false}
            >
              {({ checked }) => <span>Coins</span>}
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
                          ? "border-2 border-shadowLight bg-accent text-second hover:scale-105"
                          : "bg-second  text-shadowDark hover:scale-105"
                      }
                        relative flex cursor-pointer rounded-lg px-3 py-2 m-1 w-36 justify-center shadow-md focus:outline-none hover:scale-105`
              }
              value={true}
            >
              {({ checked }) => <span>Converter</span>}
            </RadioGroup.Option>
          </RadioGroup>
        </div>
        <div>
          {converter ? (
            <Converter allCoinsData={allCoinsData} />
          ) : (
            <div>
              <div>
                <ChartsMain />
              </div>
              <div className="flex flex-col items-center justify-center">
                <Row className="bg-second shadow-md text-xs font-semibold text-shadowDark grid grid-cols-10 sm:grid-cols-17 gap-2 ">
                  <div className="flex items-center justify-center col-span-1">
                    #
                  </div>
                  <div className="col-span-1"></div>
                  <div className="flex justify-start items-center col-span-2">
                    Name
                  </div>
                  <div className="flex justify-start items-center col-span-2">
                    Price
                  </div>
                  <div className="flex justify-start items-center ml-1 col-span-2 sm:col-span-1 ">
                    1h%
                  </div>
                  <div className="flex justify-start items-center ml-1 col-span-2 sm:col-span-1">
                    24hr%
                  </div>
                  <div className="hidden sm:flex justify-start items-center ml-1 col-span-1">
                    7d%
                  </div>
                  <div className="hidden sm:flex justify-center items-center ml-2 col-span-3">
                    24h Volume/Market Cap
                  </div>
                  <div className="hidden sm:flex justify-center items-center col-span-3">
                    Circulating/ Total Supply
                  </div>
                  <div className="hidden sm:flex justify-start items-center col-span-2">
                    Last 7d
                  </div>
                </Row>
              </div>
              <div className="flex flex-col items-center justify-center">
                {allCoinsData?.map((coin: CoinType, index: number) => (
                  <div key={coin.id}>
                    <CoinRow coin={coin} index={index + 1} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
