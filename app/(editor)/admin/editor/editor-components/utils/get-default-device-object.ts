import { DeviceRecord } from "../toolbar-elements/types";

export const getDefaultDeviceObject = <T,>(
  obj: T
): DeviceRecord<T> => {
  return {
    sm: obj,
    md: obj,
    lg: obj,
    xl: obj,
    "2xl": obj,
  } as const;
};
