"use client";

import { useState } from "react";
import PortfolioList from "../components/PortfolioList";
import { CoinForm } from "../components/CoinForm";
import { useCrypto } from "../Providers/CryptoProvider";
import { useGetAllCoinsQuery } from "../Providers/api/apiSlice";
import { EditForm } from "../components/EditForm";
import Link from "next/link";
import { Coin } from "../sharedinterfaces";
import { PlusIcon } from "../icons/Icons";
export default function Page() {
  const { data: allCoinsData, isLoading, isError } = useGetAllCoinsQuery({
    currency: "usd",
    sortValue: "volume_desc",
  });

  const [addFormOn, setAddFormOn] = useState(false);
  const [editFormOn, setEditFormOn] = useState(false);
  const [coinToEdit, setCoinToEdit] = useState<Coin | undefined>();
  const { currentUser, palette, mode } = useCrypto();

  const handleForm = () => {
    setAddFormOn(!addFormOn);
    setEditFormOn(false);
  };

  function handleEditForm(coin: Coin) {
    setCoinToEdit(coin);
    setEditFormOn(!editFormOn);
    setAddFormOn(false);
  }

  return (
    <div
      className={`w-full min-h-full bg-base theme-${palette} theme-${mode} flex items-center justify-start flex-col`}
    >
      {isLoading && (
        <div className="w-screen h-screen flex justify-center items-center my-8 mr-36 mt-36 cursor-wait">
          Loading...
        </div>
      )}
      <div>
        {isError && <h2>An error occured while loading. Please try again.</h2>}
      </div>
      {currentUser && !isLoading ? (
        <div className="my-24 sm:m-0">
          <div className="w-full h-full">
            <div>
              <div className="w-full flex justify-end mr-36 sm:mt-36 ">
                <button
                  className="hidden sm:inline bg-accent p-4 rounded-lg"
                  onClick={() => setAddFormOn(!addFormOn)}
                >
                  Add Asset
                </button>
              </div>

              {editFormOn && coinToEdit && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-30">
                  <EditForm
                    coinToEdit={coinToEdit}
                    handleEditForm={handleEditForm}
                  />
                </div>
              )}

              {addFormOn && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                  <CoinForm
                    allCoinsData={allCoinsData}
                    handleForm={handleForm}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="font-medium flex justify-between items-end text-lg sm:text-3xl text-accent">
            <p>Your Assets:</p>{" "}
            <button
              className="sm:hidden"
              onClick={() => setAddFormOn(!addFormOn)}
            >
              <PlusIcon />
            </button>
          </div>
          <PortfolioList handleEditForm={handleEditForm} />
        </div>
      ) : (
        <div className="flex sm:flex-row flex-col text-center justify-center items-center text-lg min-h-lvh w-full ">
          Porfolio's are available only to our members. Please{" "}
          <Link
            href="/sign-in"
            className=" drop-shadow-md text-accent mx-2 hover:scale-105"
          >
            Sign-in
          </Link>{" "}
          or{" "}
          <Link
            href="/sign-up"
            className="drop-shadow-md text-accent mx-2 hover:scale-105"
          >
            Sign-up
          </Link>{" "}
          for a free account.
        </div>
      )}
    </div>
  );
}
