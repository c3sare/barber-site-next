export type Devices = "2xl" | "xl" | "lg" | "md" | "sm";

export type DeviceRecord<T> = Record<Devices, T>;

export type SingleWidthType = {
  value?: string;
  metric?: "px" | "em" | "rem" | "vw" | "vh" | "auto" | "custom";
};

export type MultiDeviceWidthType = DeviceRecord<SingleWidthType>;
