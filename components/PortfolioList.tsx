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
              <li key={c.id}>
                {c.coin?.name}
                {c.id}
                <button onClick={() => dispatch(removeCoin(c))}>Delete</button>
              </li>
            ))}
        </div>
      </div>
    </>
  );
}

export default PortfolioList;
