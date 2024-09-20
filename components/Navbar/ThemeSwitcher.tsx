import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? <Moon /> : <Sun color="yellow" />}
    </button>
  );
};
