"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Bar = "components" | "settings" | null;

type EditorContextType = {
  currentOpenBar: Bar;
  toggleBar: (bar: Bar) => void;
  closeBar: () => void;
  openBar: (bar: Bar) => void;
  isOpenLayersBar: boolean;
  toggleLayersBar: () => void;
};

const EditorContext = createContext<EditorContextType | null>(null);

export const EditorContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [currentOpenBar, setCurrentOpenBar] = useState<Bar>(null);
  const [isOpenLayersBar, setIsOpenLayersBar] = useState(false);

  const value = useMemo(
    () => ({
      currentOpenBar,
      toggleBar: (bar: Bar) =>
        setCurrentOpenBar((state) =>
          state !== bar || state === null ? bar : null
        ),
      closeBar: () => setCurrentOpenBar(null),
      openBar: (bar: Bar) => setCurrentOpenBar(bar),
      isOpenLayersBar,
      toggleLayersBar: () => setIsOpenLayersBar((state) => !state),
    }),
    [currentOpenBar, isOpenLayersBar]
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
