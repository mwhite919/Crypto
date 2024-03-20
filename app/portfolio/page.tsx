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
      className={`w-window min-h- bg-base theme-${palette} theme-${mode} flex items-start justify-center flex-col  `}
    >
      <div className="w-full flex justify-center mt-36 relative">
        {editFormOn && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <EditForm coinToEdit={coinToEdit} handleEditForm={handleEditForm} />
          </div>
        )}
        {addFormOn && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-2">
            <CoinForm allCoinsData={allCoinsData} handleForm={handleForm} />
          </div>
        )}

        <div className="w-[900px]">
          <div className="w-full flex justify-end">
            {" "}
            <button
              className="bg-second drop-shadow-md p-4 rounded-lg text-shadowDark"
              onClick={() => setAddFormOn(!addFormOn)}
            >
              Add Asset
            </button>
          </div>
          <div className="justify-start font-medium text-xl text-shadowDark">
            Your Statistics:
          </div>

          <PortfolioList handleEditForm={handleEditForm} />
        </div>
      </div>
    </div>
  );
}
