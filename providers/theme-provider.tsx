/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ThemeProvider as Them } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
 
export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {

  return (
    <Them
      {...props}
      attribute={"class"}
      themes={["light", "dark"]}
    >
        {children}
    </Them>
  ) ;
}
