import { DeviceRecord } from "../toolbar-elements/types";
import { getDefaultDeviceObject } from "../utils/get-default-device-object";

export type SingleWidthType = {
  value?: string;
  metric?: "px" | "em" | "rem" | "vw" | "vh" | "auto" | "custom";
};

export type MultiDeviceWidthType = DeviceRecord<SingleWidthType>;

export type TextType = {
  text?: string;
  width?: MultiDeviceWidthType;
  fontSize?: MultiDeviceWidthType;
  weight?: DeviceRecord<string>;
  marginTop?: MultiDeviceWidthType;
  marginBottom?: MultiDeviceWidthType;
  align?: DeviceRecord<string>;
  color?: DeviceRecord<string>;
};

const sizes = getDefaultDeviceObject({
  metric: "px",
});

export const defaultTextProps: TextType = {
  text: "This is a basic text element.",
  width: sizes,
  fontSize: sizes,
  weight: getDefaultDeviceObject("400"),
  marginTop: sizes,
  marginBottom: sizes,
  align: getDefaultDeviceObject(undefined as unknown as string),
  color: getDefaultDeviceObject(undefined as unknown as string),
};
