import styled from "styled-components";
import { DeviceRecord, MultiDeviceWidthType } from "../toolbar-elements/types";
import { calculateWidth } from "../../helpers/calculateWidth";

const heading = ["h1", "h2", "h3", "h4", "h5", "h6"];

const isHeading = (tag?: string) => !!tag && heading.includes(tag);

const HeadingSize = (tag: (typeof heading)[number]) => {
  switch (tag) {
    case "h1":
      return Math.round(16 * 1.25 * 1.25 * 1.25 * 1.25 * 1.25);
    case "h2":
      return Math.round(16 * 1.25 * 1.25 * 1.25 * 1.25);
    case "h3":
      return Math.round(16 * 1.25 * 1.25 * 1.25);
    case "h4":
      return Math.round(16 * 1.25 * 1.25);
    case "h5":
      return Math.round(16 * 1.25);
    case "h6":
      return 16;
    default:
      return 16;
  }
};

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
    as,
  }) => `
  width: ${calculateWidth(w?.["2xl"])};
  ${
    fs?.["2xl"]?.value
      ? `font-size: ${calculateWidth(fs["2xl"])};`
      : isHeading(as as string)
      ? `font-size: ${HeadingSize(as as string)}px;`
      : ""
  }
  ${mt?.["2xl"]?.value ? `margin-top: ${calculateWidth(mt["2xl"])};` : ""}
  ${mb?.["2xl"]?.value ? `margin-bottom: ${calculateWidth(mb["2xl"])};` : ""}
  ${
    wg?.["2xl"]
      ? `font-weight: ${wg["2xl"]};`
      : isHeading(as as string)
      ? "font-weight: bold;"
      : ""
  }
  ${al?.["2xl"] ? `text-align: ${al["2xl"]};` : ""}
  ${c?.["2xl"] ? `color: ${c["2xl"]};` : ""}
  ${f?.["2xl"] ? `font-family: "${f["2xl"]}", sans-serif;` : ""}

  @media (max-width: 1119px) {
    ${w?.["xl"]?.value ? `width: ${calculateWidth(w["xl"])};` : ""}
    ${fs?.["xl"]?.value ? `font-size: ${calculateWidth(fs["xl"])};` : ""}
    ${mt?.["xl"]?.value ? `margin-top: ${calculateWidth(mt["xl"])};` : ""}
    ${mb?.["xl"]?.value ? `margin-bottom: ${calculateWidth(mb["xl"])};` : ""}
    ${wg?.["xl"] ? `font-weight: ${wg["xl"]};` : ""}
    ${al?.["xl"] ? `text-align: ${al["xl"]};` : ""}
    ${c?.["xl"] ? `color: ${c["xl"]};` : ""}
    ${f?.["xl"] ? `font-family: "${f["xl"]}", sans-serif;` : ""}
  }

  @media (max-width: 1023px) {
    ${w?.["lg"]?.value ? `width: ${calculateWidth(w["lg"])};` : ""}
    ${fs?.["lg"]?.value ? `font-size: ${calculateWidth(fs["lg"])};` : ""}
    ${mt?.["lg"]?.value ? `margin-top: ${calculateWidth(mt["lg"])};` : ""}
    ${mb?.["lg"]?.value ? `margin-bottom: ${calculateWidth(mb["lg"])};` : ""}
    ${wg?.["lg"] ? `font-weight: ${wg["lg"]};` : ""}
    ${al?.["lg"] ? `text-align: ${al["lg"]};` : ""}
    ${c?.["lg"] ? `color: ${c["lg"]};` : ""}
    ${f?.["lg"] ? `font-family: "${f["lg"]}", sans-serif;` : ""}
  }

  @media (max-width: 767px) {
    ${w?.["md"]?.value ? `width: ${calculateWidth(w["md"])};` : ""}
    ${fs?.["md"]?.value ? `font-size: ${calculateWidth(fs["md"])};` : ""}
    ${mt?.["md"]?.value ? `margin-top: ${calculateWidth(mt["md"])};` : ""}
    ${mb?.["md"]?.value ? `margin-bottom: ${calculateWidth(mb["md"])};` : ""}
    ${wg?.["md"] ? `font-weight: ${wg["md"]};` : ""}
    ${al?.["md"] ? `text-align: ${al["md"]};` : ""}
    ${c?.["md"] ? `color: ${c["md"]};` : ""}
    ${f?.["md"] ? `font-family: "${f["md"]}", sans-serif;` : ""}
  }

  @media (max-width: 479px) {
    ${w?.["sm"]?.value ? `width: ${calculateWidth(w["sm"])};` : ""}
    ${fs?.["sm"]?.value ? `font-size: ${calculateWidth(fs["sm"])};` : ""}
    ${mt?.["sm"]?.value ? `margin-top: ${calculateWidth(mt["sm"])};` : ""}
    ${mb?.["sm"]?.value ? `margin-bottom: ${calculateWidth(mb["sm"])};` : ""}
    ${wg?.["sm"] ? `font-weight: ${wg["sm"]};` : ""}
    ${al?.["sm"] ? `text-align: ${al["sm"]};` : ""}
    ${c?.["sm"] ? `color: ${c["sm"]};` : ""}
    ${f?.["sm"] ? `font-family: "${f["sm"]}", sans-serif;` : ""}
  }
`
);
