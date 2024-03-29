"use client";

import React, { useEffect, useState } from "react";
import {
  EditIcon,
  TrashIcon,
  TriangleDown,
  TriangleUp,
} from "@/app/icons/Icons";
import CharacterCounter from "./CharacterCounter";
import { useAppSelector } from "@/redux/hooks";
import initializeFirebase from "../firebase/config";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
import { Coin } from "../sharedinterfaces";

interface PortfolioListProps {
  handleEditForm: (data: any) => void;
}

function PortfolioList({ handleEditForm }: PortfolioListProps) {
  const { db } = initializeFirebase();
  const currency = useAppSelector((state) => state.currency);
  const [coins, setCoins] = useState<
    {
      amount: number;
      purchasePrice: any;
      date: any;
      coin: Coin;
      id: string;
    }[]
  >([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "portfoliocoins"), (snapshot) => {
        const tester = snapshot.docs.map((doc) => ({
          amount: doc.data().amount,
          purchasePrice: doc.data().purchasePrice,
          date: doc.data().date,
          coin: doc.data().coin,
          id: doc.id,
        }));
        console.log("tester", tester);
        setCoins(tester);
      }),
    []
  );

  const handleDelete = async (id: string) => {
    const docRef = doc(db, "portfoliocoins", id);
    await deleteDoc(docRef);
  };

  function percentage(x: number, y: number) {
    return (x / y).toFixed(2);
  }

  function limiter(x: number) {
    if (x < 1) {
      return Number(x);
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
      <div className="z-0">
        <div>
          {coins ? (
            coins?.map((c) => (
              <div
                className="w-[900px] rounded-lg flex justify-center items-center h-64 bg-second my-3 z-0 p-3 drop-shadow-md"
                key={c.id}
              >
                <div className="flex justify-between w-full">
                  <div className="h-48 w-48 flex items-center justify-center  ">
                    <div className="flex items-center justify-center flex-col p-8 text-shadowDark text-lg font-bold bg-base font-pj rounded-xl ">
                      <img src={c.coin.image} className="h-16" />
                      <div className={CharacterCounter(c?.coin?.name?.length)}>
                        {c.coin.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col text-center w-full">
                    <div className="flex justify-between items-center">
                      <div className="w-24"></div>
                      <div className="text-shadowDark font-semibold w-24">
                        Market Price
                      </div>
                      <div className="w-24">
                        <button onClick={() => handleDelete(c.id)}>
                          <TrashIcon />
                        </button>
                        <button onClick={() => handleEditForm(c)}>
                          <EditIcon />
                        </button>
                      </div>
                    </div>
                    <div className="flex w-full justify-evenly items-center border-b  border-accent h-1/2">
                      <div className="flex flex-col justify-center items-center p-3 text-shadowDark">
                        <div className="text-xs">Current Price:</div>
                        <div className="text-accent font-semibold">
                          {currency.symbol}
                          {c?.coin?.current_price?.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center p-3 ">
                        <div className="text-xs text-shadowDark">
                          Price Change 24h:
                        </div>
                        <div className="flex items-center text-accent font-semibold">
                          {currency.symbol}
                          {c?.coin?.price_change_24h?.toFixed(2)}
                          {c?.coin?.price_change_24h >= 0 ? (
                            <TriangleUp />
                          ) : (
                            <TriangleDown />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center p-3 text-center ">
                        <div className="text-xs text-shadowDark ">
                          Volume vs Market Cap:
                        </div>
                        <div className="flex items-center justify-center text-accent font-semibold ">
                          {limiter(
                            parseInt(
                              percentage(
                                c?.coin?.total_volume,
                                c?.coin?.market_cap
                              )
                            )
                          )}
                          %
                          <div className="h-2 w-16 bg-base">
                            <div
                              className="h-2 bg-accent"
                              style={{
                                width: limiter(
                                  parseInt(
                                    percentage(
                                      c?.coin?.total_volume,
                                      c?.coin?.market_cap
                                    )
                                  )
                                ),
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center items-center p-3">
                        <div className="text-xs text-shadowDark text-center">
                          Circulating Supply vs Total Supply:
                        </div>
                        <div className="flex items-center justify-center text-accent font-semibold">
                          {c?.coin?.circulating_supply &&
                          c?.coin?.total_supply ? (
                            percentage(
                              c?.coin?.circulating_supply,
                              c?.coin?.total_supply
                            )
                          ) : (
                            <p>N/A</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between w-full">
                      <div className="w-24"></div>
                      <div className="my-3 w-full text-shadowDark font-semibold">
                        Your Coins
                      </div>
                      <div className="w-24"></div>
                      <div className="flex w-full justify-evenly items-center">
                        <div className="flex-col">
                          <div className="text-xs text-shadowDark text-center">
                            Coin Amount:
                          </div>
                          <div className="text-accent font-semibold">
                            {c.amount}
                          </div>
                        </div>
                        <div className="flex-col">
                          <div className="text-xs text-shadowDark text-center">
                            Amount Value
                          </div>
                          <div className="text-accent font-semibold">
                            {currency.symbol}{" "}
                            {(c.amount * c.coin.current_price)?.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex-col">
                          <div className="text-xs text-center text-shadowDark">
                            Price Change Since Purchase
                          </div>
                          <div className="text-accent flex items-center justify-center font-semibold">
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
                            {c?.coin?.price_change_24h >= 0 ? (
                              <TriangleUp />
                            ) : (
                              <TriangleDown />
                            )}
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="text-xs text-center text-shadowDark">
                            Purchase Price:
                          </div>
                          <div className="text-accent font-semibold">
                            {currency.symbol}
                            {parseInt(
                              c.purchasePrice[currency.currency.toLowerCase()]
                            ).toFixed(2)}
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="text-xs text-center text-shadowDark">
                            Date Purchased:
                          </div>
                          <div className="text-accent font-semibold">
                            {c.date.split("-").reverse().join("-")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-2xl text-accent">
              You haven't added any coins to your portfolio yet!
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PortfolioList;
