"use client";

import React, { useEffect, useState } from "react";
import {
  EditIcon,
  TrashIcon,
  TriangleDown,
  TriangleUp,
} from "@/app/icons/Icons";
import CharacterCounter from "../utils/CharacterCounter";
import { useAppSelector } from "@/redux/hooks";
import initializeFirebase from "../firebase/config";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
import { Coin } from "../sharedinterfaces";
import Image from "next/image";

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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "portfoliocoins"),
      (snapshot) => {
        const collect = snapshot.docs.map((doc) => ({
          amount: doc.data().amount,
          purchasePrice: doc.data().purchasePrice,
          date: doc.data().date,
          coin: doc.data().coin,
          id: doc.id,
        }));
        setCoins(collect);
      }
    );
    return () => unsubscribe();
  }, [db]);

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
                className="w-[300px] sm:w-[900px] rounded-lg flex justify-center items-center sm:h-64 bg-second my-3 z-0 p-3 drop-shadow-md"
                key={c.id}
              >
                <div className="flex flex-col sm:flex-row justify-between w-full">
                  <div className="sm:h-48 sm:w-48 flex items-center justify-center  ">
                    <div className="flex items-center w-[276px] p-4 justify-between sm:justify-center sm:flex-col sm:p-8 text-shadowDark sm:text-lg sm:bg-base font-pj rounded-xl ">
                      <Image
                        alt="Coin Icon"
                        src={c.coin.image}
                        className="h-16 hidden sm:inline"
                        width={64}
                        height={64}
                      />
                      <div className="flex flex-col justify-center items-start font-semibold">
                        <div
                          className={CharacterCounter(c?.coin?.name?.length)}
                        >
                          {c.coin.name}
                        </div>
                        <div className="sm:hidden text-xs font-normal">
                          Purchased {c.date.split("-").reverse().join("-")}
                        </div>
                      </div>
                      <Image
                        alt="Coin Icon"
                        src={c.coin.image}
                        className="h-8 sm:hidden"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col text-center w-full">
                    <div className="hidden sm:flex justify-between items-center">
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
                    <div className="grid grid-cols-2 sm:flex w-full justify-evenly items-center sm:border-b  border-accent h-1/2">
                      <div className="col-span-1 flex flex-col justify-center items-center p-3 text-shadowDark">
                        <div className="text-xs">Current Price:</div>
                        <div className="text-accent font-semibold">
                          {currency.symbol}
                          {c?.coin?.current_price?.toFixed(2)}
                        </div>
                      </div>
                      <div className="col-span-1 sm:flex flex-col justify-center items-center p-3 ">
                        <div className="text-xs text-shadowDark">
                          Price Change 24h:
                        </div>
                        <div className="flex items-center justify-center text-accent font-semibold">
                          {currency.symbol}
                          {c?.coin?.price_change_24h?.toFixed(2)}
                          {c?.coin?.price_change_24h >= 0 ? (
                            <TriangleUp />
                          ) : (
                            <TriangleDown />
                          )}
                        </div>
                      </div>
                      <div className=" col-span-1 flex flex-col justify-center items-center p-3 text-center ">
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

                      <div className="col-span-1 flex flex-col justify-center items-center p-3">
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
                    <div className="hidden sm:flex flex-col items-center justify-between w-full">
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
