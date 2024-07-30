"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const deviceWidth = {
  "2xl": 1132,
  xl: 1024,
  lg: 768,
  md: 480,
  sm: 400,
};

type Props = {
  frameWidth: number;
  setFrameWidth: React.Dispatch<React.SetStateAction<number>>;
  device: keyof typeof deviceWidth;
  setDevice: (dev: keyof typeof deviceWidth) => void;
};

export const FrameDeviceSizeContext = createContext<Props | null>(null);

export const FrameDeviceSizeContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [frameWidth, setFrameWidth] = useState(1920);

  const device = useMemo(() => {
    if (frameWidth > 1119) {
      return "2xl";
    } else if (frameWidth < 1119 && frameWidth > 1023) {
      return "xl";
    } else if (frameWidth < 1023 && frameWidth > 767) {
      return "lg";
    } else if (frameWidth < 767 && frameWidth > 479) {
      return "md";
    } else {
      return "sm";
    }
  }, [frameWidth]);

  const setDevice = useCallback(
    (dev: typeof device) => {
      setFrameWidth(deviceWidth[dev]);
    },
    [setFrameWidth]
  );

  const value = useMemo(
    () => ({
      frameWidth,
      device: device as keyof typeof deviceWidth,
      setFrameWidth,
      setDevice,
    }),
    [frameWidth, setFrameWidth, device, setDevice]
  );

  return (
    <FrameDeviceSizeContext.Provider value={value}>
      {children}
    </FrameDeviceSizeContext.Provider>
  );
};

export const useFrameDeviceSize = () => {
  const context = useContext(FrameDeviceSizeContext);

  if (!context) {
    throw new Error(
      "useFrameDeviceSize must be used within a FrameDeviceSizeContextProvider"
    );
  }

  return context;
};
