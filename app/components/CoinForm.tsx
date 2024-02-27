"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCoin } from "@/redux/portfolio/portfolioSlice";
import { useCrypto } from "../Providers/CryptoProvider";
import styled from "styled-components";
import { CloseIcon, ResetIcon } from "@/app/icons/Icons";

const DropdownRow = styled.div`
  cursor: pointer;
  text-align: start;
  margin: 2px, 0;
  position: relative;
  z-index: 1;
`;

export const CoinForm = ({ allCoinsData, handleForm }) => {
  const [coin, setCoin] = useState({});
  const [missingCoin, setMissingCoin] = useState(false);
  const [amount, setAmount] = useState("");
  const [missingAmount, setMissingAmount] = useState(false);
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [numError, setnumError] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !amount || !coin) {
      if (!date) setDateError(true);
    }
    if (!amount) {
      setMissingAmount(true);
    }
    if (!coin.name) {
      setMissingCoin(true);
    }
    if (coin && amount && date) {
      dispatch(
        addCoin({ id: Math.random(), coin: coin, amount: amount, date: date })
      );
      setSearchValue("");
      setCoin({});
      setAmount("");
      setDate("");
      handleForm();
    }
  };

  const closeForm = () => {
    handleForm();
    setSearchValue("");
    setCoin({});
    setAmount("");
    setDate("");
  };

  const resetForm = () => {
    setSearchValue("");
    setCoin({});
    setAmount("");
    setDate("");
    setnumError(false);
    setMissingAmount(false);
    setMissingCoin(false);
    setDateError(false);
  };

  const handleSearchChange = (e) => {
    const newValueIsValid = !e.target.validity.patternMismatch;
    if (numError) {
      if (newValueIsValid) {
        setnumError(false);
      }
    }
    const inputValue = e.target.value;
    setSearchValue(inputValue);
  };

  const handleBlur = (e) => {
    if (e.target.validity.patternMismatch) {
      setnumError(true);
    }
    const newValueIsValid = !e.target.validity.patternMismatch;
    if (numError) {
      if (newValueIsValid) {
        setnumError(false);
      }
    }
    setMissingAmount(!amount);
  };

  const handleDateBlur = (e) => {
    if (date) {
      setDateError(false);
    }
  };

  const handleDate = (e) => {
    setDateError(false);
    setDate(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSearch = (searchedCoin) => {
    if (searchValue) {
      setSearchValue("");
      setCoin(searchedCoin);
      setMissingCoin(false);
    }
    if (!searchValue) {
      return;
    }
  };

  const handleKeyPress = (e: { key: any }) => {
    if (e.key === "Enter") {
      return;
      handleSubmit();
    }
  };

  return (
    <>
      <div className="drop-shadow-xl">
        <div
          style={{ width: 700, height: 300 }}
          className="flex justify-center items-center flex-col bg-accent rounded-lg m-10  p-10"
        >
          <div className="flex items-center justify-between w-full">
            <div className="text-second">Select Coins</div>
            <div className="w-16 flex justify-between mb-3">
              <button onClick={resetForm}>
                <ResetIcon />
              </button>
              <button onClick={closeForm}>
                <CloseIcon />
              </button>
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
            <div className="flex flex-col justify-start h-48 w-1/2 items-start ">
              <form>
                {missingCoin && (
                  <p
                    role="alert"
                    className="text-xs"
                    style={{ color: "rgb(200, 0, 0)" }}
                  >
                    Please choose a coin.
                  </p>
                )}
                <input
                  value={searchValue ? searchValue : coin.name || ""}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyPress}
                  placeholder={"Start typing to find your coin..."}
                  type="text"
                  className={`mx-3 drop-shadow-md rounded-sm pl-3 w-72 shadow-md ${
                    missingCoin ? "border-2 mb-2 border-rose-600" : "my-3"
                  }`}
                />
                <div className="absolute">
                  {searchValue &&
                    currentCoins
                      .filter((item) => {
                        const name = item.name.toLowerCase();
                        const search = searchValue.toLowerCase();
                        return name.startsWith(search);
                      })
                      .map((item) => (
                        <div key={item.id} className="border-slate-300">
                          <DropdownRow
                            key={item.id}
                            className="bg-second"
                            onClick={() => handleSearch(item)}
                          >
                            {item.name}
                          </DropdownRow>
                        </div>
                      ))}
                </div>
                {numError && (
                  <p
                    role="alert"
                    className="text-xs"
                    style={{ color: "rgb(200, 0, 0)" }}
                  >
                    Please make sure you've entered a <em>number</em>
                  </p>
                )}
                {missingAmount && (
                  <p
                    role="alert"
                    className="text-xs"
                    style={{ color: "rgb(200, 0, 0)" }}
                  >
                    Please enter an amount.
                  </p>
                )}
                <input
                  type="text"
                  onChange={handleAmountChange}
                  value={amount}
                  placeholder="How much?"
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]+"
                  onBlur={handleBlur}
                  className={`mx-3 drop-shadow-md rounded-sm pl-3 ${
                    numError ? "border-2 mb-2 border-rose-600" : "my-3"
                  }`}
                />
                {dateError && (
                  <p
                    role="alert"
                    className="text-xs"
                    style={{ color: "rgb(200, 0, 0)" }}
                  >
                    Please enter a date.
                  </p>
                )}
                <input
                  onChange={(e) => handleDate(e)}
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onBlur={handleDateBlur}
                  max={new Date().toISOString().split("T")[0]}
                  className={`mx-3 drop-shadow-md rounded-sm pl-3 ${
                    dateError ? "border-2 mb-2 border-rose-600" : "my-3"
                  }`}
                />
              </form>
              <div className="w-72 flex justify-between items-center">
                <button
                  className="m-3 py-2 bg-second rounded-md w-36"
                  type="submit"
                  onClick={closeForm}
                >
                  Cancel
                </button>
                <button
                  disabled={
                    numError || dateError || missingAmount || missingCoin
                  }
                  type="submit"
                  onClick={handleSubmit}
                  className={` m-3 py-2 bg-second rounded-md w-36 ${
                    numError || dateError || missingAmount || missingCoin
                      ? "opacity-70"
                      : ""
                  }`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
