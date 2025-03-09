import { getColumnWidthWithGap } from "../../helpers/getColumnWithGap";
import {
  DeviceRecord,
  Devices,
  MultiDeviceWidthType,
  SingleWidthType,
} from "../toolbar-elements/types";
import {
  BorderRadiusType,
  GradientType,
  ShadowType,
  SideType,
  WithHover,
} from "./types";

type ColumnLayout = "vertical" | "horizontal" | "grid" | "advanced";

type Props = {
  id: string;
  layout?: DeviceRecord<ColumnLayout>;
  verticalLayout?: DeviceRecord<{
    align?: DeviceRecord<string>;
    valign?: DeviceRecord<string>;
    gap?: MultiDeviceWidthType;
  }>;
  horizontalLayout?: DeviceRecord<{
    align?: DeviceRecord<string>;
    valign?: DeviceRecord<string>;
    gap?: MultiDeviceWidthType;
    verticalAt?: Devices;
  }>;
  gridLayout?: DeviceRecord<{
    itemsPerRow?: DeviceRecord<number>;
    gap?: MultiDeviceWidthType;
    advanced?: {
      align?: DeviceRecord<string>;
      valign?: DeviceRecord<string>;
      orginalDimensions?: boolean;
    };
  }>;
  advancedLayout?: {
    display?: "flex" | "grid";
    flex?: {
      flexDirection?: DeviceRecord<string>;
      alignItems?: DeviceRecord<string>;
      justifyContent?: DeviceRecord<string>;
      flexWrap?: DeviceRecord<string>;
      alignContent?: DeviceRecord<string>;
      gap?: MultiDeviceWidthType;
      rowGap?: MultiDeviceWidthType;
      textAlign?: DeviceRecord<string>;
    };
    grid?: {
      grid?: DeviceRecord<string>;
      gridTemplate?: DeviceRecord<string>;
      gap?: MultiDeviceWidthType;
      rowGap?: MultiDeviceWidthType;
      justifyItems?: DeviceRecord<string>;
      alignItems?: DeviceRecord<string>;
      justifyContent?: DeviceRecord<string>;
      alignContent?: DeviceRecord<string>;
      gridAutoColumns?: MultiDeviceWidthType;
      gridAutoFlow?: DeviceRecord<string>;
      textAlign?: DeviceRecord<string>;
    };
  };
  width?: number;
  columnsCount?: number;
  minHeight?: MultiDeviceWidthType;
  gap?: MultiDeviceWidthType;
  alignY?: DeviceRecord<string>;
  alignX?: DeviceRecord<string>;
  horizontalAlignY?: DeviceRecord<string>;
  horizontalAlignX?: DeviceRecord<string>;
  verticalAt?: "2xl" | "xl" | "lg" | "md" | "sm";
  order?: DeviceRecord<number>;
  padding?: SideType<number>;
  borderRadius?: BorderRadiusType;
  borderWidth?: DeviceRecord<SideType<SingleWidthType>>;
  borderColor?: DeviceRecord<SideType<string>>;
  borderStyle?: DeviceRecord<SideType<string>>;
  shadow?: DeviceRecord<ShadowType>;
  bgColor?: WithHover<string>;
  bgType?: "image" | "gradient";
  gradient?: GradientType;
  bgGradientScalePercent?: number;
  bgGradientSpeedSeconds?: number;
};

export const style = ({ id, width: w, gap: gap, columnsCount: cc }: Props) => {
  const xl = getColumnWidthWithGap(gap?.["xl"], cc, w);
  const lg = getColumnWidthWithGap(gap?.["lg"], cc, w);
  const md = getColumnWidthWithGap(gap?.["md"], cc, w);
  const sm = getColumnWidthWithGap(gap?.["sm"], cc, w);

  return `.${id} {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 16px;
    position: relative;
    ${getColumnWidthWithGap(gap?.["2xl"] ?? { metric: "px", value: "32" }, cc, w)}

    ${
      xl
        ? `@media (max-width: 1119px) {
      ${xl}
    }`
        : ""
    }

    ${
      lg
        ? `@media (max-width: 1023px) {
      ${lg}
    }`
        : ""
    }

    ${
      md
        ? `@media (max-width: 767px) {
      ${md}
    }`
        : ""
    }

    ${
      sm
        ? `@media (max-width: 479px) {
      ${sm}
    }`
        : ""
    }
    }`
    .replaceAll(" ", "")
    .replaceAll("\n", "");
};
