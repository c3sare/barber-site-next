export type SingleWidthType = {
  value?: string;
  metric?: "px" | "em" | "rem" | "vw" | "vh" | "auto" | "custom";
};

export type DeviceRecord<T> = Record<"sm" | "md" | "lg" | "xl" | "2xl", T>;

type MultiDeviceType = DeviceRecord<SingleWidthType>;

const getDefaultDeviceObject = <T extends unknown>(obj: T): DeviceRecord<T> => {
  return {
    sm: obj,
    md: obj,
    lg: obj,
    xl: obj,
    "2xl": obj,
  };
};

const defaultWeightObject = getDefaultDeviceObject("400");

export type TextType = {
  text?: string;
  width?: MultiDeviceType;
  fontSize?: MultiDeviceType;
  weight?: typeof defaultWeightObject;
  marginTop?: MultiDeviceType;
  marginBottom?: MultiDeviceType;
};

export type WidthType = TextType["width"];

const sizes = getDefaultDeviceObject({
  metric: "px",
} as SingleWidthType);

export const defaultTextProps: TextType = {
  text: "This is a basic text element.",
  width: sizes,
  fontSize: sizes,
  weight: defaultWeightObject,
  marginTop: sizes,
  marginBottom: sizes,
};
