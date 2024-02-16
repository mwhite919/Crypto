"use client";

import React from "react";
import { UseSelector, useSelector } from "react-redux";

function PortfolioList() {
  const listCoins = useSelector((state) => state.portfolio.coins);

  console.log("list", listCoins);

  return (
    <div>
      <div>PortfolioList</div>
      <div>
        {listCoins.map((c) => {
          return <li>{c.coin?.name}</li>;
        })}
      </div>
    </div>
  );
}

export default PortfolioList;
