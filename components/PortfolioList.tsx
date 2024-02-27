"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCoin } from "@/redux/portfolio/portfolioSlice";
import styled from "styled-components";
import { EditIcon, TrashIcon } from "@/icons/Icons";

const Row = styled.div`
  width: 900px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  padding-top: 4px;
  border-radius: 10px;
`;

function PortfolioList({ listCoins }) {
  const [purchasePrice, setPurchasePrice] = useState("");
  const dispatch = useDispatch();

  function percentage(x, y) {
    return (x / y).toFixed(2);
  }

  function limiter(x) {
    if (x < 1) {
      return x;
    }
    if (x >= 1) {
      return 100;
    }
  }

  const getPurchasePrice = async (coinName, date) => {
    try {
      setIsLoading(true);
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${coinName}/history?date=${date}&localization=false`
      );
      console.log("price", data);
    } catch (err) {
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <div>
          {listCoins ? (
            listCoins.map((c) => (
              <Row className="h-64 bg-second m-3 z-0" key={c.id}>
                <div className="flex justify-between">
                  <div className="h-48 w-48 flex items-center justify-center ">
                    <div className="">
                      <div class=" -inset-5">
                        <div class="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-second to-primary"></div>
                      </div>
                      <div className="flex items-center justify-center flex-col  p-8 text-lg font-bold text-second bg-accent2 font-pj rounded-xl ">
                        <img src={c.coin.image} className="h-16" />
                        <div>{c.coin.name}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col text-center">
                    <div className="flex justify-between items-center">
                      <div className="w-24"></div>
                      <div className=" w-24">Market Price</div>
                      <div className="w-24">
                        <button onClick={() => dispatch(removeCoin(c))}>
                          <TrashIcon />
                        </button>
                        <button>
                          <EditIcon />
                        </button>
                      </div>
                    </div>
                    <div className="flex border-b  border-accent2 h-1/2">
                      <div className="flex flex-col justify-center items-center p-3 text-xs">
                        <div>Current Price:</div>
                        <div className="text-accent text-lg font-semibold">
                          {c?.coin?.current_price.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center p-3 ">
                        <div className="text-xs">Price Change 24h:</div>
                        <div className="text-accent text-lg font-semibold">
                          {c?.coin?.price_change_24h.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center p-3 text-center ">
                        <div className="text-xs ">Volume vs Market Cap:</div>
                        <div className="flex items-center justify-center text-accent text-lg font-semibold ">
                          {percentage(
                            c?.coin?.total_volume,
                            c?.coin?.market_cap
                          )}
                          %
                          <div className="h-2 w-16 bg-base">
                            <div
                              className="h-2 bg-accent"
                              style={{
                                width: limiter(
                                  percentage(
                                    c?.coin?.total_volume,
                                    c?.coin?.market_cap
                                  )
                                ),
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center items-center p-3">
                        <div className="text-xs text-center">
                          Circulating Supply vs Total Supply:
                        </div>
                        <div className="flex items-center justify-center text-accent text-lg font-semibold">
                          {percentage(
                            c?.coin?.circulating_supply,
                            c?.coin?.total_supply
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between ">
                      <div className="w-24"></div>
                      <div className="my-3 w-24">Your Coins</div>
                      <div className="w-24"></div>
                      <div className="flex items-center justify-between">
                        <div className="flex-col">
                          <div>Coin Amount:</div>
                          <div className="text-accent text-lg font-semibold">
                            {c.amount}
                          </div>
                        </div>
                        <div className="flex-col">
                          <div>Amount Value</div>
                          <div className="text-accent text-lg font-semibold">
                            {(c.amount * c.coin.current_price).toFixed(2)}
                          </div>
                        </div>
                        <div className="flex-col">
                          <div>Price Change Since Purchase</div>
                          <div className="text-accent text-lg font-semibold">
                            {(c.amount * c.coin.current_price).toFixed(2)}
                          </div>
                        </div>
                        <div className="p-3">
                          Purchase Price:
                          {c.date.split("-").reverse().join("-")}
                        </div>
                        <div className="p-3">
                          Date Purchased:
                          {c.date.split("-").reverse().join("-")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            ))
          ) : (
            <div>You haven't added any coins to your portfolio yet!</div>
          )}
        </div>
      </div>
    </>
  );
}

export default PortfolioList;
