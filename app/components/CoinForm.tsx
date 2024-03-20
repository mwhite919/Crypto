"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { CloseIcon, ResetIcon } from "@/app/icons/Icons";
import axios from "axios";
import CharacterCounter from "./characterCounter";
import { DropDownRow } from "../constants/DropDownRow";
import db from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { uid } from "uid";

export const CoinForm = ({ allCoinsData, handleForm }) => {
  const [coin, setCoin] = useState({});
  const [missingCoin, setMissingCoin] = useState(false);
  const [amount, setAmount] = useState("");
  const [missingAmount, setMissingAmount] = useState(false);
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [numError, setnumError] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const resultContainer = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e) => {
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
      const collectionRef = collection(db, "portfoliocoins");
      const payload = {
        id: uid(),
        coin: coin,
        amount: amount,
        purchasePrice: purchasePrice,
        date: date,
      };
      const docRef = await addDoc(collectionRef, payload);
      handleForm();
      setSearchValue("");
      setCoin({});
      setAmount("");
      setDate("");
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

  const getPurchasePrice = async (coinName: string, date: string) => {
    try {
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/${coinName.toLowerCase()}/history?date=${date}&localization=false&x_cg_demo_api_key=CG-du5JzYuTcSZtNRw58BTw3e27`
      );
      setPurchasePrice(data.market_data.current_price);
    } catch (err) {
      console.log(err);
    }
  };

  if (coin && date) {
    getPurchasePrice(coin.id, date.split("-").reverse().join("-"));
  }

  const handleSearchChange = (e) => {
    const newValueIsValid = !e.target.validity.patternMismatch;
    if (numError) {
      if (newValueIsValid) {
        setnumError(false);
      }
    }
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    setShowResults(true);
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
    setShowResults(false);
  };

  const handleDateBlur = () => {
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
      setSearchValue(searchedCoin.name);
      setCoin(searchedCoin);
      setMissingCoin(false);
    }
    if (!searchValue) {
      return;
    }
  };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
  }, []);

  useEffect(() => {
    if (!resultContainer.current) return;
    resultContainer.current.scrollIntoView({
      block: "center",
    });
  }, [focusedIndex]);

  const handleKeyPress = (e: { key: any }) => {
    const { key } = e;
    let nextIndexCount = 0;
    if (key === "ArrowDown") nextIndexCount = focusedIndex + 1;
    if (key === "ArrowUp") nextIndexCount = focusedIndex - 1;
    if (e.key === "Enter") return handleSelection(focusedIndex);
    setFocusedIndex(nextIndexCount);
  };

  const filteredCoinsArray = allCoinsData?.filter((coin) => {
    const name = coin.name.toLowerCase();
    const search = searchValue.toLowerCase();
    const coins = name.startsWith(search);
    return coins;
  });

  const mappedCoinsArray = filteredCoinsArray?.map((coin, index) => (
    <DropDownRow
      key={coin.id}
      ref={index === focusedIndex ? resultContainer : null}
      className={`
    cursor-pointer
    hover:bg-slate-200
     ${focusedIndex === index ? "active bg-slate-200" : "bg-white"}`}
      onMouseDown={() => handleSelection(index)}
      onBlur={resetSearchComplete}
    >
      {coin.name}
    </DropDownRow>
  ));

  const handleSelection = (selectedIndex: number) => {
    const selectedItem = filteredCoinsArray[selectedIndex];
    setCoin(selectedItem);
    setSearchValue(selectedItem.name);
    if (!selectedItem) return resetSearchComplete();
    handleSearch(selectedItem);
    resetSearchComplete();
  };

  return (
    <>
      <div className="drop-shadow-xl border-[1px] border-base">
        <div className="flex w-[700px] h-[300px] justify-center items-center flex-col bg-second text-shadowDark rounded-lg">
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
              {coin?.name && (
                <div className="relative ">
                  <div className="absolute -inset-5">
                    <div className="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-second to-primary"></div>
                  </div>
                  <div className="flex items-center justify-center relative p-8 text-lg font-bold text-second bg-second font-pj rounded-xl ">
                    <img src={coin?.image} className="h-16" />
                    <span className={CharacterCounter(coin?.name.length)}>
                      {coin?.name}
                    </span>
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

                <div className="relative z-10 ">
                  <input
                    value={searchValue ? searchValue : ""}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyPress}
                    onBlur={resetSearchComplete}
                    placeholder={"Start typing to find your coin..."}
                    type="text"
                    className={`mx-3 drop-shadow-md rounded-sm pl-3 w-72 shadow-md relative inline-block focus: border-slate-200
                    ${missingCoin ? "border-2 mb-2 border-rose-600" : "my-3"}`}
                  />
                  <div className="mx-3 absolute max-h-44 overflow-y-auto w-72">
                    {showResults && mappedCoinsArray}
                  </div>
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
                  className="m-3 py-2 bg-base rounded-md w-36"
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
                  className={` m-3 py-2 bg-base rounded-md w-36 ${
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
