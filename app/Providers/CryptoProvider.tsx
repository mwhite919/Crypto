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
  handlePalette: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleMode: (value: string) => void;
  loginError: boolean;
  handleLoginError: () => void;
  currentUser: any;
  handleConverter: () => void;
  converter: boolean;
}

export const CryptoContext = createContext<CryptoContextType>({
  palette: "default",
  mode: "light",
  handlePalette: (e: ChangeEvent<HTMLSelectElement>) => {},
  handleMode: (value: string) => {},
  loginError: false,
  handleLoginError: () => {},
  currentUser: null,
  handleConverter: () => {},
  converter: false,
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
  const [converter, setConverter] = useState(false);

  function handleLoginError() {
    setLoginError(!loginError);
  }
  const [palette, setPalette] = useStickyState(
    Palettes[0].theme,
    "theme-palette"
  );
  const [mode, setMode] = useStickyState(modes[0], "theme-mode");

  const handlePalette = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPalette(e.target.value);
  };

  function handleMode(value: string) {
    setMode(value);
  }

  function handleConverter() {
    setConverter(!converter);
  }

  return (
    <CryptoContext.Provider
      value={{
        handleConverter,
        converter,
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
