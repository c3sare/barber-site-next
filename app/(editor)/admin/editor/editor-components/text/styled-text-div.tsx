import styled from "styled-components";
import { getWidth } from "./utils";
import { WidthType } from "./types/text-type";

export const StyledTextDiv = styled("div")<{ $width: WidthType }>(
  ({ $width: w }) => `
  width: ${getWidth(w["2xl"])};

  @media (max-width: 1119px) {
    ${w["xl"]?.value ? `width: ${getWidth(w["xl"])};` : ""}
  }

  @media (max-width: 1023px) {
    ${w["lg"]?.value ? `width: ${getWidth(w["lg"])};` : ""}
  }

  @media (max-width: 767px) {
    ${w["md"]?.value ? `width: ${getWidth(w["md"])};` : ""}
  }

  @media (max-width: 479px) {
    ${w["sm"]?.value ? `width: ${getWidth(w["sm"])};` : ""}
  }
`
);
