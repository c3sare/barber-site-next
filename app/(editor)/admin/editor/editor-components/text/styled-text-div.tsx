import styled from "styled-components";
import { getWidth } from "./utils";
import { DeviceRecord, MultiDeviceWidthType } from "../toolbar-elements/types";

export const StyledTextDiv = styled("div")<{
  $width?: MultiDeviceWidthType;
  $fontSize?: MultiDeviceWidthType;
  $marginTop?: MultiDeviceWidthType;
  $marginBottom?: MultiDeviceWidthType;
  $weight?: DeviceRecord<string>;
  $align?: DeviceRecord<string>;
  $color?: DeviceRecord<string>;
  $font?: DeviceRecord<string>;
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
  }) => `
  width: ${getWidth(w?.["2xl"])};
  ${fs?.["2xl"]?.value ? `font-size: ${getWidth(fs["2xl"])};` : ""}
  ${mt?.["2xl"]?.value ? `margin-top: ${getWidth(mt["2xl"])};` : ""}
  ${mb?.["2xl"]?.value ? `margin-bottom: ${getWidth(mb["2xl"])};` : ""}
  ${wg?.["2xl"] ? `font-weight: ${wg["2xl"]};` : ""}
  ${al?.["2xl"] ? `text-align: ${al["2xl"]};` : ""}
  ${c?.["2xl"] ? `color: ${c["2xl"]};` : ""}
  ${f?.["2xl"] ? `font-family: "${f["2xl"]}", sans-serif;` : ""}

  @media (max-width: 1119px) {
    ${w?.["xl"]?.value ? `width: ${getWidth(w["xl"])};` : ""}
    ${fs?.["xl"]?.value ? `font-size: ${getWidth(fs["xl"])};` : ""}
    ${mt?.["xl"]?.value ? `margin-top: ${getWidth(mt["xl"])};` : ""}
    ${mb?.["xl"]?.value ? `margin-bottom: ${getWidth(mb["xl"])};` : ""}
    ${wg?.["xl"] ? `font-weight: ${wg["xl"]};` : ""}
    ${al?.["xl"] ? `text-align: ${al["xl"]};` : ""}
    ${c?.["xl"] ? `color: ${c["xl"]};` : ""}
    ${f?.["xl"] ? `font-family: "${f["xl"]}", sans-serif;` : ""}
  }

  @media (max-width: 1023px) {
    ${w?.["lg"]?.value ? `width: ${getWidth(w["lg"])};` : ""}
    ${fs?.["lg"]?.value ? `font-size: ${getWidth(fs["lg"])};` : ""}
    ${mt?.["lg"]?.value ? `margin-top: ${getWidth(mt["lg"])};` : ""}
    ${mb?.["lg"]?.value ? `margin-bottom: ${getWidth(mb["lg"])};` : ""}
    ${wg?.["lg"] ? `font-weight: ${wg["lg"]};` : ""}
    ${al?.["lg"] ? `text-align: ${al["lg"]};` : ""}
    ${c?.["lg"] ? `color: ${c["lg"]};` : ""}
    ${f?.["lg"] ? `font-family: "${f["lg"]}", sans-serif;` : ""}
  }

  @media (max-width: 767px) {
    ${w?.["md"]?.value ? `width: ${getWidth(w["md"])};` : ""}
    ${fs?.["md"]?.value ? `font-size: ${getWidth(fs["md"])};` : ""}
    ${mt?.["md"]?.value ? `margin-top: ${getWidth(mt["md"])};` : ""}
    ${mb?.["md"]?.value ? `margin-bottom: ${getWidth(mb["md"])};` : ""}
    ${wg?.["md"] ? `font-weight: ${wg["md"]};` : ""}
    ${al?.["md"] ? `text-align: ${al["md"]};` : ""}
    ${c?.["md"] ? `color: ${c["md"]};` : ""}
    ${f?.["md"] ? `font-family: "${f["md"]}", sans-serif;` : ""}
  }

  @media (max-width: 479px) {
    ${w?.["sm"]?.value ? `width: ${getWidth(w["sm"])};` : ""}
    ${fs?.["sm"]?.value ? `font-size: ${getWidth(fs["sm"])};` : ""}
    ${mt?.["sm"]?.value ? `margin-top: ${getWidth(mt["sm"])};` : ""}
    ${mb?.["sm"]?.value ? `margin-bottom: ${getWidth(mb["sm"])};` : ""}
    ${wg?.["sm"] ? `font-weight: ${wg["sm"]};` : ""}
    ${al?.["sm"] ? `text-align: ${al["sm"]};` : ""}
    ${c?.["sm"] ? `color: ${c["sm"]};` : ""}
    ${f?.["sm"] ? `font-family: "${f["sm"]}", sans-serif;` : ""}
  }
`
);
