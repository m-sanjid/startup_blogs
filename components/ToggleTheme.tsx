"use client";
import { useTheme } from "next-themes";

import { MoonStar, Sun } from "lucide-react";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav>
      {theme === "dark" && (
        <button type="button" onClick={() => setTheme("dark")}>
          <MoonStar />
        </button>
      )}
      {theme === "light" && (
        <button type="button" onClick={() => setTheme("light")}>
          <Sun />
        </button>
      )}
    </nav>
  );
};

export default ThemeChanger;
