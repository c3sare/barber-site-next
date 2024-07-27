"use client";

import { getFonts } from "@/actions/getFonts";
import { createContext, useContext, useMemo, useState } from "react";

type FontsContextType = {
  fonts: Awaited<ReturnType<typeof getFonts>>;
  usedFonts: string[];
  setUsedFonts: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FontsContext = createContext<FontsContextType | null>(null);

type Props = {
  children?: React.ReactNode;
  fonts: Awaited<ReturnType<typeof getFonts>>;
};

export const FontsContextProvider = ({ children, fonts }: Props) => {
  const [usedFonts, setUsedFonts] = useState<string[]>([]);

  const value = useMemo(
    () => ({
      fonts,
      usedFonts,
      setUsedFonts,
    }),
    [fonts, usedFonts]
  );

  return (
    <FontsContext.Provider value={value}>{children}</FontsContext.Provider>
  );
};

export const useFonts = () => {
  const fonts = useContext(FontsContext);

  if (!fonts) throw new Error("FontsContext not found");

  return fonts;
};
