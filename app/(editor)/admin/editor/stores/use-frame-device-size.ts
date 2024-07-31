import { useCallback, useMemo } from "react";
import { create } from "zustand";

type Store = {
  frameWidth: number;
  setFrameWidth: (frameWidth: number) => void;
  maxWidth: number;
  setMaxWidth: (maxWidth: number) => void;
};

const useFrameWidth = create<Store>()((set) => ({
  frameWidth: 1920,
  maxWidth: 250,
  setMaxWidth: (maxWidth: number) => set({ maxWidth }),
  setFrameWidth: (frameWidth: number) => set({ frameWidth }),
}));

const deviceWidth = {
  "2xl": 1132,
  xl: 1024,
  lg: 768,
  md: 480,
  sm: 400,
};

export const useFrameDeviceSize = () => {
  const { frameWidth, setFrameWidth, maxWidth, setMaxWidth } = useFrameWidth();

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
      setFrameWidth(dev === "2xl" ? maxWidth : deviceWidth[dev]);
    },
    [setFrameWidth, maxWidth]
  );

  const value = useMemo(
    () => ({
      frameWidth,
      device: device as keyof typeof deviceWidth,
      setFrameWidth,
      setDevice,
      maxWidth,
      setMaxWidth,
    }),
    [frameWidth, setFrameWidth, device, setDevice, maxWidth, setMaxWidth]
  );

  return value;
};
