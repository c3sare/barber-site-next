import styled from "styled-components";
import { getWidth } from "./utils";
import { WidthType } from "./types/text-type";

export const StyledTextDiv = styled("div")<{
  $width: WidthType;
  $fontSize: WidthType;
  $marginTop: WidthType;
  $marginBottom: WidthType;
}>(
  ({ $width: w, $fontSize: fs, $marginTop: mt, $marginBottom: mb }) => `
  width: ${getWidth(w?.["2xl"])};
  ${fs?.["2xl"]?.value ? `font-size: ${getWidth(fs["2xl"])};` : ""}
  ${mt?.["2xl"]?.value ? `margin-top: ${getWidth(mt["2xl"])};` : ""}
  ${mb?.["2xl"]?.value ? `margin-bottom: ${getWidth(mb["2xl"])};` : ""}

  @media (max-width: 1119px) {
    ${w?.["xl"]?.value ? `width: ${getWidth(w["xl"])};` : ""}
    ${fs?.["xl"]?.value ? `font-size: ${getWidth(fs["xl"])};` : ""}
    ${mt?.["xl"]?.value ? `margin-top: ${getWidth(mt["xl"])};` : ""}
    ${mb?.["xl"]?.value ? `margin-bottom: ${getWidth(mb["xl"])};` : ""}
  }

  @media (max-width: 1023px) {
    ${w?.["lg"]?.value ? `width: ${getWidth(w["lg"])};` : ""}
    ${fs?.["lg"]?.value ? `font-size: ${getWidth(fs["lg"])};` : ""}
    ${mt?.["lg"]?.value ? `margin-top: ${getWidth(mt["lg"])};` : ""}
    ${mb?.["lg"]?.value ? `margin-bottom: ${getWidth(mb["lg"])};` : ""}
  }

  @media (max-width: 767px) {
    ${w?.["md"]?.value ? `width: ${getWidth(w["md"])};` : ""}
    ${fs?.["md"]?.value ? `font-size: ${getWidth(fs["md"])};` : ""}
    ${mt?.["md"]?.value ? `margin-top: ${getWidth(mt["md"])};` : ""}
    ${mb?.["md"]?.value ? `margin-bottom: ${getWidth(mb["md"])};` : ""}
  }

  @media (max-width: 479px) {
    ${w?.["sm"]?.value ? `width: ${getWidth(w["sm"])};` : ""}
    ${fs?.["sm"]?.value ? `font-size: ${getWidth(fs["sm"])};` : ""}
    ${mt?.["sm"]?.value ? `margin-top: ${getWidth(mt["sm"])};` : ""}
    ${mb?.["sm"]?.value ? `margin-bottom: ${getWidth(mb["sm"])};` : ""}
  }
`
);
