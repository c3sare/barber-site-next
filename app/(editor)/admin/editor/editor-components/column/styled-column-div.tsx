import { Resizable } from "re-resizable";
import styled from "styled-components";
import {
  DeviceRecord,
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

type Props = {
  $width?: number;
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

export const StyledColumnDiv = styled(Resizable)<Props>(
  ({ $width: w, $gap: gap }) => `
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    ${calculateColumnWidth(w, gap?.["2xl"] ?? { metric: "px", value: "32" })}

    @media (max-width: 1119px) {
      ${calculateColumnWidth(w, gap?.["xl"])}
    }

    @media (max-width: 1023px) {
      ${calculateColumnWidth(w, gap?.["lg"])}
    }

    @media (max-width: 767px) {
      ${calculateColumnWidth(w, gap?.["md"])}
    }

    @media (max-width: 479px) {
      ${calculateColumnWidth(w, gap?.["2xl"])}
    }
`
);
