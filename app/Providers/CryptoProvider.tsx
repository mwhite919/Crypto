"use client";
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export const CryptoContext = createContext();

export function useCrypto() {
  const value = useContext(CryptoContext);
  return value;
}

const palettes = ["basic", "teal", "neon-pastel", "rose", "amber"];
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

export default function CryptoProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sortValue, setSortValue] = useState("volume_desc");
  const [numberOfDays, setNumberOfDays] = useState("7");
  const [user] = useAuthState(auth);
  const userSession = localStorage.getItem("user");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async () => {
    try {
      setLoginError(false);
      const res = await signInWithEmailAndPassword(email, password);
      localStorage.setItem("user", true);
      if (res?.user.email) {
        router.push("/portfolio");
        setEmail("");
        setPassword("");
        return;
      }
      if (!user) {
        setLoginError(true);
        router.push("/sign-up");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoginError(false);
      const res = await createUserWithEmailAndPassword(email, password);
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
  };

  const [palette, setPalette] = useStickyState(
    palettes[0],
    "theme-palette" || "basic"
  );
  const [mode, setMode] = useStickyState(modes[0], "theme-mode" || "light");

  function handleTime(value: string) {
    setNumberOfDays(value);
  }

  function handleCurrency(e: string) {
    setCurrency(e.target.value);
  }

  function handleSort(e: string) {
    setSortValue(e.target.value);
  }

  function handlePalette(e: string) {
    setPalette(e.target.value);
  }

  function handleMode(value) {
    setMode(value);
  }

  function handleEmail(e: string) {
    setEmail(e.target.value);
  }

  function handlePassword(e: string) {
    setPassword(e.target.value);
  }

  function handleNumberOfDays(e: string) {
    setNumberOfDays(e.target.value);
  }

  function handleSignOut() {
    signOut(auth);
    localStorage.removeItem("user");
  }

  function handleLoginError() {
    setLoginError(false);
  }

  return (
    <CryptoContext.Provider
      value={{
        currency,
        handleCurrency,
        currencySymbol,
        handleSort,
        handleTime,
        numberOfDays,
        handleNumberOfDays,
        handleSignOut,
        handleSignIn,
        email,
        password,
        handleEmail,
        handlePassword,
        loginError,
        handleSignUp,
        user,
        userSession,
        palette,
        mode,
        handlePalette,
        handleMode,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}
