"use client";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCoin } from "@/redux/portfolio/portfolioSlice";
import styled from "styled-components";
import { EditIcon, TrashIcon } from "@/app/icons/Icons";
import CharacterCounter from "./characterCounter";
import { useAppSelector } from "@/redux/hooks";
import db from "../firebase/config";
import { onSnapshot, collection } from "firebase/firestore";

const Row = styled.div`
  width: 900px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  padding-top: 4px;
  border-radius: 10px;
`;

const ListItem = (coin) => {
  return <div>{coin}</div>;
};

function PortfolioList() {
  const listCoins = useSelector((state) => state.portfolio.coins);
  const currency = useAppSelector((state) => state.currency);
  const dispatch = useDispatch();
  const ref = React.useRef();

  const [coins, setCoins] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "portfoliocoins"), (snapshot) => {
        setCoins(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }),
    []
  );

  console.log(coins);

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

  function findPercentPriceChange(purchasedP: number, currentP: number) {
    const percentageChange = ((currentP - purchasedP) / purchasedP) * 100;
    return `${percentageChange.toFixed(2)}%`;
  }

  return (
    <>
      <div>
        <ul>
          {" "}
          {coins.map((coin) => (
            <li key={coin.id}>
              {coin.name},{coin.amount}
            </li>
          ))}
        </ul>

        {/* <div>
          {listCoins ? (
            listCoins.map((c) => (
              <Row className="h-64 bg-second m-3 z-0 p-3" key={c.id}>
                <div className="flex justify-between w-full">
                  <div className="h-48 w-48 flex items-center justify-center ">
                    <div className="">
                      <div className=" -inset-5">
                        <div className="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-second to-primary"></div>
                      </div>
                      <div className="flex items-center justify-center flex-col  p-8 text-lg font-bold text-second bg-accent2 font-pj rounded-xl ">
                        <img src={c.coin.image} className="h-16" />
                        <div className={CharacterCounter(c.coin.name.length)}>
                          {c.coin.name}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col text-center w-full">
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
                    <div className="flex w-full justify-evenly items-center border-b  border-accent2 h-1/2">
                      <div className="flex flex-col justify-center items-center p-3 text-xs">
                        <div>Current Price:</div>
                        <div className="text-accent text-lg font-semibold">
                          {currency.symbol}
                          {c?.coin?.current_price.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center p-3 ">
                        <div className="text-xs">Price Change 24h:</div>
                        <div className="text-accent text-lg font-semibold">
                          {currency.symbol}
                          {c?.coin?.price_change_24h.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center p-3 text-center ">
                        <div className="text-xs ">Volume vs Market Cap:</div>
                        <div className="flex items-center justify-center text-accent text-lg font-semibold ">
                          {limiter(
                            percentage(
                              c?.coin?.total_volume,
                              c?.coin?.market_cap
                            )
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
                          {c?.coin?.circulating_supply &&
                          c?.coin?.total_supply ? (
                            percentage(
                              c?.coin?.circulating_supply,
                              c?.coin?.total_supply
                            )
                          ) : (
                            <p>No Info</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between w-full">
                      <div className="w-24"></div>
                      <div className="my-3 w-24">Your Coins</div>
                      <div className="w-24"></div>
                      <div className="flex w-full justify-evenly items-center">
                        <div className="flex-col">
                          <div className="text-xs text-center">
                            Coin Amount:
                          </div>
                          <div className="text-accent text-lg font-semibold">
                            {c.amount}
                          </div>
                        </div>
                        <div className="flex-col">
                          <div className="text-xs text-center">
                            Amount Value
                          </div>
                          <div className="text-accent text-lg font-semibold">
                            {currency.symbol}{" "}
                            {(c.amount * c.coin.current_price).toFixed(2)}
                          </div>
                        </div>
                        <div className="flex-col">
                          <div className="text-xs text-center">
                            Price Change Since Purchase
                          </div>
                          <div className="text-accent text-lg font-semibold">
                            {findPercentPriceChange(
                              parseInt(c.purchasePrice[currency.currency]),
                              c.coin.current_price
                            ) ? (
                              findPercentPriceChange(
                                c.purchasePrice[currency.currency],
                                c.coin.current_price
                              )
                            ) : (
                              <p>Did not save</p>
                            )}
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="text-xs text-center">
                            Purchase Price:
                          </div>
                          <div className="text-accent text-lg font-semibold">
                            {currency.symbol}{" "}
                            {c?.purchasePrice[
                              currency.currency.toLowerCase()
                            ].toFixed(2)}
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="text-xs text-center">
                            Date Purchased:
                          </div>
                          <div className="text-accent text-lg font-semibold">
                            {c.date.split("-").reverse().join("-")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            ))
          ) : (
            <div className="text-2xl text-accent">
              You haven't added any coins to your portfolio yet!
            </div>
          )}
        </div> */}
      </div>
    </>
  );
}

export default PortfolioList;
