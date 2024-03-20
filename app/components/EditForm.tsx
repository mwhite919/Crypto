"use client";

import { useState } from "react";
import { CloseIcon, ResetIcon } from "@/app/icons/Icons";
import axios from "axios";
import CharacterCounter from "./characterCounter";
import db from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { uid } from "uid";

export const EditForm = ({ coinToEdit, handleEditForm }) => {
  const [coin, setCoin] = useState(coinToEdit);
  const [missingCoin, setMissingCoin] = useState(false);
  const [amount, setAmount] = useState(coinToEdit.amount);
  const [missingAmount, setMissingAmount] = useState(false);
  const [date, setDate] = useState(coinToEdit.date);
  const [dateError, setDateError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [numError, setnumError] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState(coinToEdit.purchasePrice);
  const [purchasePriceError, setPurchasePriceError] = useState(false);

  const saveEdit = async (e, id) => {
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
      const docRef = doc(db, "portfoliocoins", id);
      const payload = {
        id: uid(),
        coin: coin.coin,
        amount: amount,
        purchasePrice: purchasePrice,
        date: date,
      };
      await setDoc(docRef, payload);
      handleEditForm();
      setCoin({});
      setAmount("");
      setDate("");
    }
  };

  const closeForm = () => {
    handleEditForm();
    setCoin(coinToEdit);
    setAmount(coinToEdit.amount);
    setDate(coinToEdit.date);
  };

  const resetForm = () => {
    setCoin(coinToEdit);
    setAmount(coinToEdit.amount);
    setDate(coinToEdit.date);
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
      setPurchasePriceError(true);
    }
  };

  if (coin && date) {
    getPurchasePrice(coin.id, date.split("-").reverse().join("-"));
  }

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

  return (
    <>
      <div className="drop-shadow-xl border-[1px] border-base">
        <div className="flex w-[700px] h-[300px] justify-center items-center flex-col bg-second text-shadowDark rounded-lg">
          <div className="flex items-center justify-between w-full">
            <div>Select Coins</div>
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
              <div className="relative ">
                <div className="absolute -inset-5">
                  <div className="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-second to-primary"></div>
                </div>
                <div className="flex items-center justify-center relative p-8 text-lg font-bold font-pj rounded-xl ">
                  <img src={coin.coin.image} className="h-16" />
                  <span className={CharacterCounter(coin?.coin?.name?.length)}>
                    {coin.coin.name}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start h-48 w-1/2 items-start ">
              <form>
                <div>
                  <h2>{coin.name}</h2>
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
                  onClick={(e) => saveEdit(e, coinToEdit.id)}
                  className={` m-3 py-2 bg-second rounded-md w-36 ${
                    numError || dateError || missingAmount || missingCoin
                      ? "opacity-70"
                      : ""
                  }`}
                >
                  Save & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
