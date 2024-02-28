"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import PortfolioList from "@/app/components/PortfolioList";
import { CoinForm } from "@/app/components/CoinForm";
<<<<<<< HEAD
=======
import { useCrypto } from "../Providers/CryptoProvider";
>>>>>>> da9b3dfa2f5a4ea5fdcd27e075f8800dd69d6800
import { RootState } from "@/redux/store";
import { useGetAllCoinsQuery } from "../Providers/api/apiSlice";

export default function Page() {
  const { data: allCoinsData, error, isError, isLoading } = useGetAllCoinsQuery(
    {
      currency: "usd",
      sortValue: "volume_desc",
    }
  );

  const [addFormOn, setAddFormOn] = useState(false);
<<<<<<< HEAD
=======
  const { currency, user, userSession,  palette, mode} = useCrypto();
>>>>>>> da9b3dfa2f5a4ea5fdcd27e075f8800dd69d6800
  const portCoins = useAppSelector((state: RootState) => state.portfolio.coins);
  const dispatch = useDispatch();

  const handleForm = () => {
    setAddFormOn(!addFormOn);
  };

<<<<<<< HEAD
  return (
    <div className="w-full flex items-center justify-center flex-col mt-20">
      <div className="w-full flex justify-end my-8 mr-36">
=======
  if ((!user && !userSession) || user === null) {
    router.push("/sign-up");
  }

  return (
    <div
      className={`w-screen h-screen bg-base theme-${palette} theme-${mode} flex items-center justify-start flex-col  `}
    >
      <div className="w-full flex justify-end my-8 mr-36 mt-36">
>>>>>>> da9b3dfa2f5a4ea5fdcd27e075f8800dd69d6800
        <button
          className="bg-accent p-4 rounded-lg"
          onClick={() => setAddFormOn(!addFormOn)}
        >
          Add Asset
        </button>
      </div>
      <div>
        {addFormOn && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CoinForm allCoinsData={allCoinsData} handleForm={handleForm} />
          </div>
        )}
      </div>
      <div> Your Assets:</div>
      <PortfolioList listCoins={listCoins} />
    </div>
  );
}
