"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const onClickHandler = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={onClickHandler}>
      {theme === "light" ? <Moon /> : <Sun color="yellow" />}
    </button>
  );
};
