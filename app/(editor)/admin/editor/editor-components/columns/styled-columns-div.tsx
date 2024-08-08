import { styled } from "styled-components";
import {
  DeviceRecord,
  Devices,
  MultiDeviceWidthType,
} from "../toolbar-elements/types";
import { getFlexDirection } from "../../helpers/getFlexDirection";
import { getHeightVariant } from "../../helpers/getHeightVariant";
import { getCalculatedProperty } from "../../helpers/getCalculatedProperty";
import { getWidthOnVertical } from "../../helpers/getWidthOnVertical";

type ColumnDivProps = {
  $vertical?: Devices;
  $halfWidth?: Devices;
  $reverseOrder?: Devices;
  $width?: MultiDeviceWidthType;
  $heightVariant?: DeviceRecord<"fit-to-content" | "expand-to-fill" | "custom">;
  $height?: MultiDeviceWidthType;
  $columnGap?: MultiDeviceWidthType;
  $columnPadding?: MultiDeviceWidthType;
  $marginTop?: MultiDeviceWidthType;
  $marginBottom?: MultiDeviceWidthType;
  $columnsCount?: number;
};

const ifTrueReturn = (value: boolean, returnValue: string) =>
  value ? returnValue : "";

export const StyledColumnsDiv = styled.div<ColumnDivProps>(
  ({
    $vertical: v = "xl",
    $halfWidth: hw,
    $reverseOrder: ro,
    $width: w,
    $heightVariant: hv,
    $height: h,
    $columnGap: gap,
    $columnPadding: p,
    $marginBottom: mb,
    $marginTop: mt,
    $columnsCount: cc,
  }) => `
    ${ifTrueReturn(cc === 0, "min-height: 200px;")}
    ${ifTrueReturn(!!hw, "flex-wrap: wrap;")}
    ${getFlexDirection("2xl", v, ro)}
    ${getCalculatedProperty("width", w?.["2xl"])}
    ${getHeightVariant(hv?.["2xl"], h?.["2xl"])}
    ${getCalculatedProperty("gap", gap?.["2xl"], { metric: "px", value: "32" })}
    ${getCalculatedProperty("margin-top", mt?.["2xl"])}
    ${getCalculatedProperty("margin-bottom", mb?.["2xl"])}

    &>div {
      ${getWidthOnVertical(
        "2xl",
        v,
        hw,
        gap?.["2xl"] ?? { metric: "px", value: "32" }
      )}
      ${getCalculatedProperty("padding", p?.["2xl"])}
    }

  @media (max-width: 1119px) {
    ${getFlexDirection("xl", v, ro)}
    ${getCalculatedProperty("width", w?.["xl"])}
    ${getHeightVariant(hv?.["xl"], h?.["xl"])}
    ${getCalculatedProperty("gap", gap?.["xl"])}
    ${getCalculatedProperty("margin-top", mt?.["xl"])}
    ${getCalculatedProperty("margin-bottom", mb?.["xl"])}

    &>div {
      ${getWidthOnVertical("xl", v, hw, gap?.["xl"])}
      ${getCalculatedProperty("padding", p?.["xl"])}
    }
  }

  @media (max-width: 1023px) {
    ${getFlexDirection("lg", v, ro)}
    ${getCalculatedProperty("width", w?.["lg"])}
    ${getHeightVariant(hv?.["lg"], h?.["lg"])}
    ${getCalculatedProperty("gap", gap?.["lg"])}
    ${getCalculatedProperty("margin-top", mt?.["lg"])}
    ${getCalculatedProperty("margin-bottom", mb?.["lg"])}

    &>div {
      ${getWidthOnVertical("lg", v, hw, gap?.["lg"])}
      ${getCalculatedProperty("padding", p?.["lg"])}
    }
  }

  @media (max-width: 767px) {
    ${getFlexDirection("md", v, ro)}
    ${getCalculatedProperty("width", w?.["md"])}
    ${getHeightVariant(hv?.["md"], h?.["md"])}
    ${getCalculatedProperty("gap", gap?.["md"])}
    ${getCalculatedProperty("margin-top", mt?.["md"])}
    ${getCalculatedProperty("margin-bottom", mb?.["md"])}

    &>div {
      ${getWidthOnVertical("md", v, hw, gap?.["md"])}
      ${getCalculatedProperty("padding", p?.["md"])}
    }
  }

  @media (max-width: 479px) {
    ${getFlexDirection("sm", v, ro)}
    ${getCalculatedProperty("width", w?.["sm"])}
    ${getHeightVariant(hv?.["sm"], h?.["sm"])}
    ${getCalculatedProperty("gap", gap?.["sm"])}
    ${getCalculatedProperty("margin-top", mt?.["sm"])}
    ${getCalculatedProperty("margin-bottom", mb?.["sm"])}

    &>div {
      ${getWidthOnVertical("sm", v, hw, gap?.["sm"])}
      ${getCalculatedProperty("padding", p?.["sm"])}
    }
  }
`
);
