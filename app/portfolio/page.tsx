"use client";

import { useState } from "react";
import PortfolioList from "@/app/components/PortfolioList";
import { CoinForm } from "@/app/components/CoinForm";
import { useCrypto } from "../Providers/CryptoProvider";
import { useGetAllCoinsQuery } from "../Providers/api/apiSlice";
import { useRouter } from "next/navigation";
import { EditForm } from "../components/EditForm";
import Link from "next/link";

export default function Page() {
  const { data: allCoinsData, isLoading, isError } = useGetAllCoinsQuery({
    currency: "usd",
    sortValue: "volume_desc",
  });

  const [addFormOn, setAddFormOn] = useState(false);
  const [editFormOn, setEditFormOn] = useState(false);
  const [coinToEdit, setCoinToEdit] = useState({});
  const { loading, currentUser, palette, mode } = useCrypto();

  const handleForm = () => {
    setAddFormOn(!addFormOn);
    setEditFormOn(false);
  };

  const router = useRouter();

  function handleEditForm(coin) {
    setCoinToEdit(coin);
    setEditFormOn(!editFormOn);
    setAddFormOn(false);
  }

  return (
    <div
      className={`w-window min-h-window bg-base theme-${palette} theme-${mode} flex items-center justify-start flex-col`}
    >
      {loading && (
        <div className="w-screen h-screen flex justify-center items-center my-8 mr-36 mt-36 cursor-wait">
          Loading...
        </div>
      )}
      <div>
        {isError && <h2>An error occured while loading. Please try again.</h2>}
      </div>
      {currentUser && !loading ? (
        <div>
          <div className="w-full h-full">
            <div>
              <div className="w-full flex justify-end my-8 mr-36 mt-36 ">
                <button
                  className="bg-accent p-4 rounded-lg"
                  onClick={() => setAddFormOn(!addFormOn)}
                >
                  Add Asset
                </button>
              </div>

              {editFormOn && (
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
          <div className="font-medium text-3xl text-accent"> Your Assets:</div>
          <PortfolioList className="z-0" handleEditForm={handleEditForm} />
        </div>
      ) : (
        <div className="flex justify-center items-center text-lg  mt-36">
          Porfolio's are available only to our members. Please{" "}
          <Link
            href="/sign-in"
            className="drop-shadow-md text-accent mx-2 hover:scale-105"
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
