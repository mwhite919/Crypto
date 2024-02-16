"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { UID } from "react-uid";

export const PortfolioContext = createContext();

export function usePortfolio() {
  const value = useContext(PortfolioContext);
  return value;
}

export const PortFolioProvider = ({ children }) => {
  const [portCoins, setPortCoins] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const addCoin = (name, amount, date) => {
    const newCoins = [
      ...portCoins,
      {
        name,
        id: uid(),
        amount,
        purchasePrice,
        date,
      },
    ];
    setPortCoins(newCoins);
  };

  const removeCoin = (coin) => {
    const newCoins = portCoins.filter((c) => c.id !== coin.id);
    setPortCoins(newPortCoins);
  };

  const getCoin = (id) => {
    return portCoins.find((item) => item.id === id);
  };

  const handleSort = (type) => {
    setSortType(type);
  };

  const handleFilter = (value) => {
    setFilterValue(value);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portCoins,
        addCoin,
        removeCoin,
        getCoin,
        handleSort,
        handleFilter,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
