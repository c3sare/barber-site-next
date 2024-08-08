import { Resizable } from "re-resizable";
import styled from "styled-components";
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
import { calculateColumnWidth } from "../../helpers/calculateColumnWidth";
import { getCalculatedProperty } from "../../helpers/getCalculatedProperty";
import { calculateWithMetrics } from "../../helpers/calculateWithMetrics";
import { getColumnWidthWithGap } from "../../helpers/getColumnWithGap";

type ColumnLayout = "vertical" | "horizontal" | "grid" | "advanced";

type Props = {
  $layout?: DeviceRecord<ColumnLayout>;
  $verticalLayout?: DeviceRecord<{
    align?: DeviceRecord<string>;
    valign?: DeviceRecord<string>;
    gap?: MultiDeviceWidthType;
  }>;
  $horizontalLayout?: DeviceRecord<{
    align?: DeviceRecord<string>;
    valign?: DeviceRecord<string>;
    gap?: MultiDeviceWidthType;
    verticalAt?: Devices;
  }>;
  $gridLayout?: DeviceRecord<{
    itemsPerRow?: DeviceRecord<number>;
    gap?: MultiDeviceWidthType;
    advanced?: {
      align?: DeviceRecord<string>;
      valign?: DeviceRecord<string>;
      orginalDimensions?: boolean;
    };
  }>;
  $advancedLayout?: {
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
  $width?: number;
  $columnsCount?: number;
  $minHeight?: MultiDeviceWidthType;
  $gap?: MultiDeviceWidthType;
  $alignY?: DeviceRecord<string>;
  $alignX?: DeviceRecord<string>;
  $horizontalAlignY?: DeviceRecord<string>;
  $horizontalAlignX?: DeviceRecord<string>;
  $verticalAt?: "2xl" | "xl" | "lg" | "md" | "sm";
  $order?: DeviceRecord<number>;
  $padding?: SideType<number>;
  $borderRadius?: BorderRadiusType;
  $borderWidth?: DeviceRecord<SideType<SingleWidthType>>;
  $borderColor?: DeviceRecord<SideType<string>>;
  $borderStyle?: DeviceRecord<SideType<string>>;
  $shadow?: DeviceRecord<ShadowType>;
  $bgColor?: WithHover<string>;
  $bgType?: "image" | "gradient";
  $gradient?: GradientType;
  $bgGradientScalePercent?: number;
  $bgGradientSpeedSeconds?: number;
};

export const StyledColumnDiv = styled.div.attrs<Props>(({ $width: w }) => ({
  style: {
    "--width": `${w}%`,
  } as any,
}))(
  ({ $width: w, $gap: gap, $columnsCount: cc }) => `
    display: flex;
    flex-direction: column;
    height: 100%;
    ${getColumnWidthWithGap(gap?.["2xl"] ?? { metric: "px", value: "32" }, cc)}

    @media (max-width: 1119px) {
      ${getColumnWidthWithGap(gap?.["xl"], cc)}
    }

    @media (max-width: 1023px) {
      ${getColumnWidthWithGap(gap?.["lg"], cc)}
    }

    @media (max-width: 767px) {
      ${getColumnWidthWithGap(gap?.["md"], cc)}
    }

    @media (max-width: 479px) {
      ${getColumnWidthWithGap(gap?.["sm"], cc)}
    }
`
);
