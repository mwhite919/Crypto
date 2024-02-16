"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCoin } from "@/redux/portfolio/portfolioSlice";

import { useCrypto } from "@/app/Providers/CryptoProvider";
import styled from "styled-components";

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
    dispatch(addCoin({ coin: coin, amount: amount, date: date }));
  };

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
  };

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
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
      <div className="flex justify-center items-center bg-accent  m-10 ">
        <div className="h-48 w-48">
          <div className="w-full h-full flex items-center justify-center flex-col">
            <img src={coin.image} className="h-16" />
            {coin.name}
          </div>
        </div>

        <form className="flex flex-col justify-center h-48 w-96 items-center">
          <input
            value={searchValue ?? ""}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter your coin..."
            type="text"
            className="m-3 drop-shadow-md rounded-sm pl-3"
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
          />
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
            id="date"
            name="date"
            value={date}
            max={new Date().toISOString().split("T")[0]}
            className="m-3 drop-shadow-md rounded-sm pl-3"
          />
          <button type="submit" onClick={handleSubmit}>
            Add Coin
          </button>
        </form>
      </div>
    </div>
  );
};
