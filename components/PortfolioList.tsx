"use client";

import React from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { removeCoin } from "@/redux/portfolio/portfolioSlice";
import styled from "styled-components";

const Row = styled.div`
  width: 1010px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  padding-top: 4px;
  border-radius: 10px;
`;

function PortfolioList() {
  const listCoins = useSelector((state) => state.portfolio.coins);

  const dispatch = useDispatch();

  return (
    <>
      <div>
        <div>
          {listCoins ? (
            listCoins.map((c) => (
              <Row className="h-20 bg-second m-3" key={c.id}>
                <div className="w-full flex justify-between">
                  <div className="flex">
                    <div className="p-3">Coin: {c.coin?.name}</div>
                    <div className="p-3">Amount: {c.id}</div>
                    <div className="p-3">Date: {c.date}</div>
                  </div>
                  <button
                    className="bg-red-200"
                    onClick={() => dispatch(removeCoin(c))}
                  >
                    Delete
                  </button>
                </div>
              </Row>
            ))
          ) : (
            <div>You haven't added any coins to your portfolio yet!</div>
          )}
        </div>
      </div>
    </>
  );
}

export default PortfolioList;
