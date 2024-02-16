"use client";

import React from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { removeCoin } from "@/redux/portfolio/portfolioSlice";

function PortfolioList() {
  const listCoins = useSelector((state) => state.portfolio.coins);

  const dispatch = useDispatch();
  console.log("list", listCoins);

  return (
    <>
      <div>
        <div>PortfolioList</div>
        <div>
          {listCoins &&
            listCoins.map((c) => (
              <div className="h-20 bg-second m-3" key={c.id}>
                <div>Coin: {c.coin?.name}</div>
                <div>Amount: {c.id}</div>
                <div>Date: {c.date}</div>
                <button
                  className="bg-red-200"
                  onClick={() => dispatch(removeCoin(c))}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default PortfolioList;
