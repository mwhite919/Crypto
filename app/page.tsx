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

const Row = styled.div`
  width: 1010px;
  height: 50px;
  border-radius: 10px;
`;

export default function Page() {
  const currency = useAppSelector((state) => state.currency);
  const { palette, mode } = useCrypto();
  const [converter, setConverter] = useState(false);

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
                          ? "border-2 border-shadowLight bg-accent text-second hover:scale-105"
                          : "bg-second text-shadowDark hover:scale-105"
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
                          ? "border-2 border-shadowLight bg-accent text-second hover:scale-105"
                          : "bg-second  text-shadowDark hover:scale-105"
                      }
                        relative flex cursor-pointer rounded-lg px-3 py-2 m-1 w-36 justify-center shadow-md focus:outline-none hover:scale-105`
              }
              value={true}
            >
              {({ checked }) => (
                <span className={checked && ""}>Converter</span>
              )}
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
          <Row className="bg-second shadow-md text-xs font-semibold text-shadowDark grid grid-cols-17 ">
            <div className="flex items-center justify-center col-span-1">#</div>
            <div className="col-span-1"></div>
            <div className="flex justify-start items-center col-span-2">
              Name
            </div>
            <div className="flex justify-start items-center col-span-2">
              Price
            </div>
            <div className="flex justify-start items-center ml-1 col-span-1">
              1h%
            </div>
            <div className="flex justify-start items-center ml-1 col-span-1">
              24hr%
            </div>
            <div className="flex justify-start items-center ml-1 col-span-1">
              7d%
            </div>
            <div className="flex justify-center items-center ml-2 col-span-3">
              24h Volume/Market Cap
            </div>
            <div className="flex justify-center items-center col-span-3">
              Circulating/ Total Supply
            </div>
            <div className="flex justify-start items-center col-span-2">
              Last 7d
            </div>
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
    </>
  );
}
