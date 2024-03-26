"use client";
import {
  useState,
  createContext,
  useContext,
  useEffect,
  ChangeEvent,
} from "react";
import { useAuth } from "@/app/firebase/config";
import { Palettes } from "../constants/Palettes";

interface CryptoContextType {
  palette: string;
  mode: string;
  handlePalette: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMode: (value: string) => void;
  loginError: boolean;
  handleLoginError: () => void;
  currentUser: any;
}

export const CryptoContext = createContext<CryptoContextType>({
  palette: "default",
  mode: "light",
  handlePalette: (e: ChangeEvent<HTMLInputElement>) => {},
  handleMode: (value: string) => {},
  loginError: false,
  handleLoginError: () => {},
  currentUser: null,
});

export function useCrypto() {
  return useContext(CryptoContext);
}

const modes = ["light", "dark"];
function useStickyState(
  defaultValue: any,
  key: any
): [any, (v: string) => void] {
  const [value, setValue] = useState<string>(defaultValue);

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
  const [palette, setPalette] = useStickyState(
    Palettes[0].theme,
    "theme-palette"
  );
  const [mode, setMode] = useStickyState(modes[0], "theme-mode");

  function handlePalette(e: ChangeEvent<HTMLInputElement>) {
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
