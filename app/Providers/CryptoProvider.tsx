"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "@/app/firebase/config";
import { Palettes } from "../constants/Palettes";

export const CryptoContext = createContext({ palette: "default", mode: "" });
export function useCrypto() {
  const value = useContext(CryptoContext);
  return value;
}

const modes = ["light", "dark"];
function useStickyState(
  defaultValue: string | undefined,
  key: string
): [string | undefined, (v: string) => void] {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    const stickyValue = localStorage.getItem(key);
    if (stickyValue !== null) {
      setValue(stickyValue);
    }
  }, [key, setValue]);

  return [
    value,
    (v) => {
      localStorage.setItem(key, v);
      setValue(v);
    },
  ];
}

interface Props {
  children: any;
}

export default function CryptoProvider({ children }: Props) {
  const [loginError, setLoginError] = useState(false);
  const currentUser = useAuth();

  function handleLoginError() {
    setLoginError(!loginError);
  }
  const [palette, setPalette] = useStickyState(Palettes[0], "theme-palette");
  const [mode, setMode] = useStickyState(modes[0], "theme-mode" || "light");

  function handlePalette(e: string) {
    setPalette(e.target.value);
  }

  function handleMode(value: string) {
    setMode(value);
  }

  return (
    <CryptoContext.Provider
      value={{
        palette,
        mode,
        handlePalette,
        handleMode,
        loginError,
        handleLoginError,
        currentUser,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}
