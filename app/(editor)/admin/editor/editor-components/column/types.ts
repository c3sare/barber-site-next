import { DeviceRecord } from "../toolbar-elements/types";

export type SideType<T> = DeviceRecord<{
  top?: T;
  right?: T;
  bottom?: T;
  left?: T;
}>;

export type BorderRadiusType = DeviceRecord<{
  topLeft?: number;
  topRight?: number;
  bottomLeft?: number;
  bottomRight?: number;
}>;

export type ShadowType = {
  color?: string;
  x?: number;
  y?: number;
  blur?: number;
  spread?: number;
};

export type WithHover<T> = {
  static?: T;
  hover?: T;
};

export type GradientType = {
  type: "linear" | "radial";
  stops?: {
    color?: string;
    positionPercent?: number;
  }[];
  degrees?: number;
};
