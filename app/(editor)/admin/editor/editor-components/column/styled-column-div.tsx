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
import { calculateColumnGap } from "../../helpers/calculateGap";

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
    ${
      w
        ? `width: calc(${w}% - ${calculateColumnGap(gap?.["2xl"])}) !important;`
        : ""
    }

    @media (max-width: 1119px) {
        ${
          w
            ? `width: calc(${w}% - ${calculateColumnGap(
                gap?.["xl"]
              )}) !important;`
            : ""
        }
    }

    @media (max-width: 1023px) {
        ${
          w
            ? `width: calc(${w}% - ${calculateColumnGap(
                gap?.["lg"]
              )}) !important;`
            : ""
        }
    }

    @media (max-width: 767px) {
        ${
          w
            ? `width: calc(${w}% - ${calculateColumnGap(
                gap?.["md"]
              )}) !important;`
            : ""
        }
    }

    @media (max-width: 479px) {
        ${
          w
            ? `width: calc(${w}% - ${calculateColumnGap(
                gap?.["sm"]
              )}) !important;`
            : ""
        }
    }
`
);
