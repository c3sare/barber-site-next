import styled from "styled-components";
import { DeviceRecord, MultiDeviceWidthType } from "../toolbar-elements/types";
import { getFontSize, getFontWeight } from "../../helpers/getFontSize";
import { getCalculatedProperty } from "../../helpers/getCalculatedProperty";
import { getProperty } from "../../helpers/getProperty";

export const StyledTextDiv = styled("div")<{
  $width?: MultiDeviceWidthType;
  $fontSize?: MultiDeviceWidthType;
  $marginTop?: MultiDeviceWidthType;
  $marginBottom?: MultiDeviceWidthType;
  $weight?: DeviceRecord<string>;
  $align?: DeviceRecord<string>;
  $color?: DeviceRecord<string>;
  $font?: DeviceRecord<string>;
  as: string;
}>(
  ({
    $width: w,
    $fontSize: fs,
    $marginTop: mt,
    $marginBottom: mb,
    $weight: wg,
    $align: al,
    $color: c,
    $font: f,
    as: tag,
  }) => `
  ${getCalculatedProperty("width", w?.["2xl"])}
  ${getFontSize(fs?.["2xl"], tag)}
  ${getCalculatedProperty("margin-top", mt?.["2xl"])}
  ${getCalculatedProperty("margin-bottom", mb?.["2xl"])}
  ${getFontWeight(wg?.["2xl"], tag)}
  ${getProperty("text-align", al?.["2xl"])}
  ${getProperty("color", c?.["2xl"])}
  ${getProperty("font-family", f?.["2xl"], ", sans-serif")}

  @media (max-width: 1119px) {
    ${getCalculatedProperty("width", w?.["xl"])}
    ${getFontSize(fs?.["xl"])}
    ${getCalculatedProperty("margin-top", mt?.["xl"])}
    ${getCalculatedProperty("margin-bottom", mb?.["xl"])}
    ${getFontWeight(wg?.["xl"])}
    ${getProperty("text-align", al?.["xl"])}
    ${getProperty("color", c?.["xl"])}
    ${getProperty("font-family", f?.["xl"], ", sans-serif")}
  }

  @media (max-width: 1023px) {
    ${getCalculatedProperty("width", w?.["lg"])}
    ${getFontSize(fs?.["lg"])}
    ${getCalculatedProperty("margin-top", mt?.["lg"])}
    ${getCalculatedProperty("margin-bottom", mb?.["lg"])}
    ${getFontWeight(wg?.["lg"])}
    ${getProperty("text-align", al?.["lg"])}
    ${getProperty("color", c?.["lg"])}
    ${getProperty("font-family", f?.["lg"], ", sans-serif")}
  }

  @media (max-width: 767px) {
    ${getCalculatedProperty("width", w?.["md"])}
    ${getFontSize(fs?.["md"])}
    ${getCalculatedProperty("margin-top", mt?.["md"])}
    ${getCalculatedProperty("margin-bottom", mb?.["md"])}
    ${getFontWeight(wg?.["md"])}
    ${getProperty("text-align", al?.["md"])}
    ${getProperty("color", c?.["md"])}
    ${getProperty("font-family", f?.["md"], ", sans-serif")}
  }

  @media (max-width: 479px) {
    ${getCalculatedProperty("width", w?.["sm"])}
    ${getFontSize(fs?.["lg"])}
    ${getCalculatedProperty("margin-top", mt?.["sm"])}
    ${getCalculatedProperty("margin-bottom", mb?.["sm"])}
    ${getFontWeight(wg?.["sm"])}
    ${getProperty("text-align", al?.["sm"])}
    ${getProperty("color", c?.["sm"])}
    ${getProperty("font-family", f?.["sm"], ", sans-serif")}
  }
`
);
