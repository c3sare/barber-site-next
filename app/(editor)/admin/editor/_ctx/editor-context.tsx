"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Bar = "components" | "settings" | null;

type EditorContextType = {
  currentOpenBar: Bar;
  toggleBar: (bar: Bar) => void;
  closeBar: () => void;
  openBar: (bar: Bar) => void;
  frameWidth: number;
  setFrameWidth: React.Dispatch<React.SetStateAction<number>>;
  isOpenLayersBar: boolean;
  toggleLayersBar: () => void;
  isResizing: boolean;
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>;
  device: string;
  setDevice: React.Dispatch<React.SetStateAction<string>>;
};

const EditorContext = createContext<EditorContextType | null>(null);

export const EditorContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [isResizing, setIsResizing] = useState(false);
  const [currentOpenBar, setCurrentOpenBar] = useState<Bar>(null);
  const [isOpenLayersBar, setIsOpenLayersBar] = useState(false);
  const [frameWidth, setFrameWidth] = useState(1920);
  const [device, setDevice] = useState<string>("2xl");

  useEffect(() => {
    if (frameWidth > 1119) {
      setDevice("2xl");
    } else if (frameWidth < 1119 && frameWidth > 1023) {
      setDevice("xl");
    } else if (frameWidth < 1023 && frameWidth > 767) {
      setDevice("lg");
    } else if (frameWidth < 767 && frameWidth > 479) {
      setDevice("md");
    } else {
      setDevice("sm");
    }
  }, [frameWidth]);

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
      isOpenLayersBar,
      toggleLayersBar: () => setIsOpenLayersBar((state) => !state),
      isResizing,
      setIsResizing,
      device,
      setDevice,
    }),
    [currentOpenBar, frameWidth, isOpenLayersBar, isResizing, device]
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
