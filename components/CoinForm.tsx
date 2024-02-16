"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCoin } from "@/redux/portfolio/portfolioSlice";
import { useCrypto } from "@/app/Providers/CryptoProvider";
import styled from "styled-components";
import { CloseIcon, ResetIcon } from "@/icons/Icons";

const DropdownRow = styled.div`
  cursor: pointer;
  text-align: start;
  margin: 2px, 0;
  position: relative;
  z-index: 1;
`;

export const CoinForm = ({ currentCoins }) => {
  const [coin, setCoin] = useState({});
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [searchValue, setSearchValue] = useState("");

  console.log("coin", coin);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addCoin({ id: Math.random(), coin: coin, amount: amount, date: date })
    );
    setSearchValue("");
    setCoin({});
    setAmount("");
    setDate("");
  };

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
  };

  const handleAmountChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    setAmount(inputValue);
  };

  const handleSearch = (searchedCoin) => {
    if (searchValue) {
      setSearchValue("");
      setCoin(searchedCoin);
    }
    if (!searchValue) {
      return;
    }
  };

  const handleKeyPress = (e: { key: any }) => {
    if (e.key === "Enter") return handleSearch(searchValue);
  };

  return (
    <div>
      <div
        style={{ width: 700 }}
        className="flex justify-center items-center flex-col bg-accent rounded-lg m-10 shadow-lg"
      >
        <div className="flex items-center justify-between w-full pt-7 px-8">
          <div className="text-second">Select Coins</div>
          <div>
            <ResetIcon />
            <CloseIcon />
          </div>
        </div>
        <div className=" w-full flex justify-center items-center ">
          <div className="h-48 w-1/2 flex items-center justify-center p-10 ">
            {coin.name && (
              <div className="relative ">
                <div class="absolute -inset-5">
                  <div class="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-second to-primary"></div>
                </div>
                <div className="flex items-center justify-center relative p-8 text-lg font-bold text-second bg-accent font-pj rounded-xl ">
                  <img src={coin.image} className="h-16" />
                  {coin.name}
                </div>
              </div>
            )}
          </div>
          <div>
            <form className="flex flex-col justify-start h-48 w-1/2 items-start ">
              <input
                value={searchValue ? searchValue : coin.name}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
                placeholder={"Start typing to find your coin..."}
                type="text"
                className="m-3 drop-shadow-md rounded-sm pl-3 w-64 shadow-md"
                required
              />
              <div className="absolute">
                {searchValue &&
                  currentCoins?.map((item) => {
                    const name = item.name.toLowerCase();
                    const search = searchValue.toLowerCase();
                    if (name.startsWith(search))
                      return (
                        <div key={item.id} className="border-slate-300">
                          <DropdownRow
                            key={item.id}
                            className="bg-second"
                            onClick={() => handleSearch(item)}
                          >
                            {item.name}
                          </DropdownRow>
                        </div>
                      );
                  })}
              </div>
              <input
                type="text"
                onChange={handleAmountChange}
                value={amount}
                placeholder="How much?"
                className="m-3 drop-shadow-md rounded-sm pl-3"
                required
              />
              <input
                onChange={(e) => setDate(e.target.value)}
                type="date"
                id="date"
                name="date"
                value={date}
                max={new Date().toISOString().split("T")[0]}
                className="m-3 drop-shadow-md rounded-sm pl-3"
                required
              />
              <button type="submit" onClick={handleSubmit}>
                Add Coin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
