"use client";

import { useState } from "react";
import PortfolioList from "@/app/components/PortfolioList";
import { CoinForm } from "@/app/components/CoinForm";
import { useCrypto } from "../Providers/CryptoProvider";
import { useGetAllCoinsQuery } from "../Providers/api/apiSlice";
import { useRouter } from "next/navigation";
import { EditForm } from "../components/EditForm";

export default function Page() {
  const { data: allCoinsData } = useGetAllCoinsQuery({
    currency: "usd",
    sortValue: "volume_desc",
  });

  const [addFormOn, setAddFormOn] = useState(false);
  const [editFormOn, setEditFormOn] = useState(false);
  const [coinToEdit, setCoinToEdit] = useState({});
  const { user, userSession, palette, mode } = useCrypto();

  const handleForm = () => {
    setAddFormOn(!addFormOn);
    setEditFormOn(false);
  };

  const router = useRouter();

  if ((!user && !userSession) || user === null) {
    router.push("/sign-up");
  }

  function handleEditForm(coin) {
    setCoinToEdit(coin);
    setEditFormOn(!editFormOn);
    setAddFormOn(false);
  }

  return (
    <div
      className={`w-window h-dvh bg-base theme-${palette} theme-${mode} flex items-center justify-start flex-col`}
    >
      <div className="w-full flex justify-end my-8 mr-36 mt-36">
        <button
          className="bg-accent p-4 rounded-lg"
          onClick={() => setAddFormOn(!addFormOn)}
        >
          Add Asset
        </button>
      </div>
      <div>
        {editFormOn && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <EditForm coinToEdit={coinToEdit} handleEditForm={handleEditForm} />
          </div>
        )}
      </div>
      <div>
        {addFormOn && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CoinForm allCoinsData={allCoinsData} handleForm={handleForm} />
          </div>
        )}
      </div>
      <div className="font-medium text-3xl text-accent"> Your Assets:</div>
      <PortfolioList handleEditForm={handleEditForm} />
    </div>
  );
}
