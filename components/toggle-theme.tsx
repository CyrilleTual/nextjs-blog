"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ToggleTheme() {

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // permet d'eviter erreur 
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <Button variant={"ghost"} size={"icon"} onClick={toggleTheme}>
        {theme === "light" ? (
          <Moon className="h-6 w-6 " />
        ) : (
          <Sun className="h-6 w-6  " />
        )}
      </Button>
    </>
  );
}
