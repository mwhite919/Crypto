"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCoin } from "@/redux/portfolio/portfolioSlice";
import styled from "styled-components";

const Row = styled.div`
  width: 900px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  padding-top: 4px;
  border-radius: 10px;
`;

function PortfolioList({ listCoins }) {
  const dispatch = useDispatch();

  function percentage(x, y) {
    return (x / y).toFixed(2);
  }

  function limiter(x) {
    if (x < 1) {
      return x;
    }
    if (x >= 1) {
      return 100;
    }
  }

  return (
    <>
      <div>
        <div>
          {listCoins ? (
            listCoins.map((c) => (
              <Row className="h-64 bg-second m-3 z-0" key={c.id}>
                <div className="flex justify-between">
                  <div className="h-48 w-48 flex items-center justify-center ">
                    <div className="">
                      <div class=" -inset-5">
                        <div class="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-second to-primary"></div>
                      </div>
                      <div className="flex items-center justify-center flex-col  p-8 text-lg font-bold text-second bg-accent2 font-pj rounded-xl ">
                        <img src={c.coin.image} className="h-16" />
                        <div>{c.coin.name}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex border-b  border-accent2 h-1/2">
                      <div className="flex flex-col justify-center items-center p-3 text-xs">
                        <div>Current Price:</div>
                        <div className="text-accent text-lg font-semibold">
                          {c?.coin?.current_price.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center p-3 ">
                        <div className="text-xs">Price Change 24h:</div>
                        <div className="text-accent text-lg font-semibold">
                          {c?.coin?.price_change_24h.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center p-3">
                        <div className="text-xs">Volume vs Market Cap:</div>
                        <div className="flex items-center justify-center text-xs text-acc">
                          {percentage(
                            c?.coin?.total_volume,
                            c?.coin?.market_cap
                          )}
                          %
                          <div className="h-2 w-16 bg-base">
                            <div
                              className="h-2 bg-accent"
                              style={{
                                width: limiter(
                                  percentage(
                                    c?.coin?.total_volume,
                                    c?.coin?.market_cap
                                  )
                                ),
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">Date: {c.date}</div>
                      <button
                        className="bg-red-200"
                        onClick={() => dispatch(removeCoin(c))}
                      >
                        Delete
                      </button>
                    </div>
                    second line
                  </div>
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
