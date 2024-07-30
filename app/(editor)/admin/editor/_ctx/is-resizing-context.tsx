"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

type Props = {
  isResizing: boolean;
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const IsResizingContext = createContext<Props | null>(null);

export const IsResizingContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      isResizing,
      setIsResizing,
    }),
    [isResizing, setIsResizing]
  );

  return (
    <IsResizingContext.Provider value={value}>
      {children}
    </IsResizingContext.Provider>
  );
};

export const useResizingEditor = () => {
  const ctx = useContext(IsResizingContext);

  if (!ctx) {
    throw new Error("ResizingContext not found");
  }

  return ctx;
};
