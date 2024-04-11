"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  FC,
  ChangeEvent,
  SetStateAction,
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import axios from "axios";
import { CloseIcon, ResetIcon } from "@/app/icons/Icons";
import { DropDownRow } from "../constants/DropDownRow";
import initializeFirebase from "../firebase/config";
import CharacterCounter from "./CharacterCounter";
import { addDoc, collection } from "firebase/firestore";
import { uid } from "uid";
import Image from "next/image";

interface Coin {
  id: string;
  coin: any[];
  amount: number;
  purchasePrice: number;
  date: string;
  image: string;
  name: string;
}

interface CoinFormProps {
  allCoinsData: Coin[];
  handleForm: () => void;
}

export const CoinForm = ({ allCoinsData, handleForm }: CoinFormProps) => {
  const [coin, setCoin] = useState<Coin | undefined>(undefined);
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
  const { db } = initializeFirebase();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!date || !amount || !coin) {
      if (!date) setDateError(true);
    }
    if (!amount) {
      setMissingAmount(true);
    }
    if (!coin?.name) {
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
      setCoin(undefined);
      setAmount("");
      setDate("");
    }
  };

  const closeForm = () => {
    handleForm();
    setSearchValue("");
    setCoin(undefined);
    setAmount("");
    setDate("");
  };

  const resetForm = () => {
    setSearchValue("");
    setCoin(undefined);
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

  const handleSearchChange = (e: {
    target: { validity: { patternMismatch: any }; value: any };
  }) => {
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

  const handleBlur = (e: {
    target: { validity: { patternMismatch: any } };
  }) => {
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

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDateError(false);
    setDate(e.target.value);
  };

  const handleAmountChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setAmount(e.target.value);
  };

  const handleSearch = (searchedCoin: SetStateAction<Coin | undefined>) => {
    if (searchValue) {
      setSearchValue(searchedCoin?.name as string);
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

  const filteredCoinsArray = allCoinsData?.filter((coin: { name: string }) => {
    const name = coin.name.toLowerCase();
    const search = searchValue.toLowerCase();
    const coins = name.startsWith(search);
    return coins;
  });

  const mappedCoinsArray = filteredCoinsArray?.map(
    (coin: { id: Key | null | undefined; name: string }, index: number) => (
      <DropDownRow
        key={coin.id}
        ref={index === focusedIndex ? resultContainer : null}
        className={`
    cursor-pointer text-shadowDark bg-second
    hover:bg-shadowDark hover:text-shadowLight
     ${
       focusedIndex === index
         ? "active text-shadowLight bg-shadowDark"
         : "text-shadowDark bg-second"
     }`}
        onMouseDown={() => handleSelection(index)}
        onBlur={resetSearchComplete}
      >
        {coin.name}
      </DropDownRow>
    )
  );

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
        <div className="flex w-[290px] sm:w-[700px] h-[500px] sm:h-[300px] justify-center items-center flex-col bg-second text-shadowDark rounded-lg">
          <div className="flex items-center justify-between w-full">
            <div className="text-second">Select Coins</div>
            <div className="hidden w-16 sm:flex justify-between ml-5 mb-5 sm:mb-3">
              <button onClick={resetForm}>
                <ResetIcon />
              </button>
            </div>
          </div>
          <div className=" w-full flex flex-col sm:flex-row justify-center items-center ">
            <div className="h-24 border border-base rounded-md sm:border-none sm:h-48 w-1/2 flex items-center justify-center p-10 ">
              {coin?.name && (
                <div className="relative py-5 px-3 m-3 ">
                  <div className="absolute -inset-5">
                    <div className="w-full h-full max-w-sm mx-auto sm:mx-0 opacity-30 blur-lg bg-gradient-to-r from-accent to-primary"></div>
                  </div>
                  <div className="border border-base flex items-center justify-center relative p-12 sm:p-8 text-lg font-bold text-shadowDark bg-second font-pj rounded-xl ">
                    <Image
                      src={coin?.image}
                      className="h-16 pr-1"
                      alt="Coin Icon"
                    />
                    <span className={CharacterCounter(coin?.name.length)}>
                      {coin?.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-start h-48 my-8 sm:w-1/2 items-start ">
              <form>
                {missingCoin && (
                  <p
                    role="alert"
                    className="text-xs pl-3"
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
                    className={`mx-3 drop-shadow-md rounded-sm pl-3 w-[240px] sm:w-72 shadow-md relative text-shadowDark bg-second inline-block focus: border-slate-200
                    ${missingCoin ? "border-2 mb-2 border-rose-600" : "my-3"}`}
                  />
                  <div className="mx-3 absolute max-h-44 overflow-y-auto w-72">
                    {showResults && mappedCoinsArray}
                  </div>
                </div>
                {numError && (
                  <p
                    role="alert"
                    className="text-xs pl-3"
                    style={{ color: "rgb(200, 0, 0)" }}
                  >
                    Please make sure you've entered a <em>number</em>
                  </p>
                )}
                {missingAmount && (
                  <p
                    role="alert"
                    className="text-xs pl-3"
                    style={{ color: "rgb(200, 0, 0)" }}
                  >
                    Please enter an amount.
                  </p>
                )}
                <input
                  type="text"
                  onChange={handleAmountChange}
                  value={amount ? amount : ""}
                  placeholder="How many?"
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]+"
                  onBlur={handleBlur}
                  className={`mx-3 drop-shadow-md rounded-sm pl-3 text-shadowDark bg-second ${
                    numError ? "border-2 mb-2 border-rose-600" : "my-3"
                  }`}
                />
                {dateError && (
                  <p
                    role="alert"
                    className="text-xs pl-3"
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
                  className={`mx-3 drop-shadow-md rounded-sm pl-3 text-shadowDark bg-second ${
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
