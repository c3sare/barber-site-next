"use client";

import { createContext, useContext, useMemo, useState } from "react";

type Bar = "components" | "settings" | null;

type EditorContextType = {
  currentOpenBar: Bar;
  toggleBar: (bar: Bar) => void;
  closeBar: () => void;
  openBar: (bar: Bar) => void;
  frameWidth: number;
  setFrameWidth: React.Dispatch<React.SetStateAction<number>>;
};

const EditorContext = createContext<EditorContextType | null>(null);

export const EditorContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [currentOpenBar, setCurrentOpenBar] = useState<Bar>(null);
  const [frameWidth, setFrameWidth] = useState(1920);

  const value = useMemo(
    () => ({
      currentOpenBar,
      toggleBar: (bar: Bar) =>
        setCurrentOpenBar((state) =>
          state !== bar || state === null ? bar : null
        ),
      closeBar: () => setCurrentOpenBar(null),
      openBar: (bar: Bar) => setCurrentOpenBar(bar),
      frameWidth,
      setFrameWidth,
    }),
    [currentOpenBar, frameWidth]
  );

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error(
      "useEditorContext must be used within a EditorContextProvider"
    );
  }

  return context;
};
