import { Resizable } from "re-resizable";
import styled from "styled-components";
import { MultiDeviceWidthType } from "../toolbar-elements/types";
import { getWidth } from "../text/utils";

type Props = {
  $width?: number;
  $gap?: MultiDeviceWidthType;
};

export const StyledColumnDiv = styled(Resizable)<Props>(
  ({ $width: w, $gap: gap }) => `
    ${
      w
        ? `width: calc(${w}% - ${
            gap?.["2xl"] ? getWidth(gap?.["2xl"]) : "32px"
          }) !important;`
        : ""
    }

    @media (max-width: 1119px) {
        ${
          w
            ? `width: calc(${w}% - ${
                gap?.["xl"] ? getWidth(gap?.["xl"]) : "32px"
              }) !important;`
            : ""
        }
    }

    @media (max-width: 1023px) {
        ${
          w
            ? `width: calc(${w}% - ${
                gap?.["lg"] ? getWidth(gap?.["lg"]) : "32px"
              }) !important;`
            : ""
        }
    }

    @media (max-width: 767px) {
        ${
          w
            ? `width: calc(${w}% - ${
                gap?.["md"] ? getWidth(gap?.["md"]) : "32px"
              }) !important;`
            : ""
        }
    }

    @media (max-width: 479px) {
        ${
          w
            ? `width: calc(${w}% - ${
                gap?.["sm"] ? getWidth(gap?.["sm"]) : "32px"
              }) !important;`
            : ""
        }
    }
`
);
