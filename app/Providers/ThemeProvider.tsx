"use client";

import { useState, useEffect, createContext, useContext } from "react";
import type { NextPage } from "next";
import { RadioGroup, Switch } from "@headlessui/react";
import axios from "axios";

export const ThemeContext = createContext();

export function useTheme() {
  const value = useContext(ThemeContext);
  return value;
}

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

const colors = ["green", "red", "blue"];
const modes = ["light", "dark"];

export const ThemeProvider: NextPage = ({ children }) => {
  const [color, setColor] = useStickyState(colors[0], "theme-color");
  const [mode, setMode] = useStickyState(modes[0], "theme-mode");

function handleModeChange(){
    setMode(mode === 'light' ? 'dark' : 'light')
}

  const handleColorChange = (e)=>{
    setColor(e)
  
  }

  return <ThemeContext.Provider
  value={{
  color, mode, handleModeChange, handleColorChange
  }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
