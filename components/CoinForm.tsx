"use client";

import { useState } from "react";
import { usePortfolio } from "@/app/Providers/PortfolioProvider";
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
  const { addCoin, removeCoin } = usePortfolio();

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
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

  console.log(currentCoins, coin);

  return (
    <>
      <div>
        <form>
          <input
            value={searchValue ?? ""}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter your coin..."
            type="text"
            className="m-5 drop-shadow-md rounded-sm pl-3"
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
          <input type="text" value={amount} placeholder="How much?" />
          <input type="date" value={date} />
        </form>
      </div>
    </>
  );
};
