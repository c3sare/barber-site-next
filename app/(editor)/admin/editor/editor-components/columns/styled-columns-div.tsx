import { styled } from "styled-components";
import {
  DeviceRecord,
  Devices,
  MultiDeviceWidthType,
} from "../toolbar-elements/types";
import { calculateWidth } from "../../helpers/calculateWidth";

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
  ${cc === 0 ? "min-height: 200px" : ""};
  ${hw ? "flex-wrap: wrap;" : ""}
    ${
      v === "2xl"
        ? `flex-direction: ${ro === "2xl" ? "column-reverse" : "column"};`
        : `${ro === "2xl" ? `flex-direction: row-reverse;` : ""}`
    }
    ${w?.["2xl"]?.value ? `width: ${calculateWidth(w["2xl"])};` : ""}
    ${hv?.["2xl"] === "expand-to-fill" ? `height: 100%;` : ""}
    ${
      hv?.["2xl"] === "custom" && h?.["2xl"]?.value
        ? `height: ${calculateWidth(h["2xl"])};`
        : ""
    }
    gap: ${gap?.["2xl"]?.value ? calculateWidth(gap["2xl"]) : "32px"};
    ${mt?.["2xl"]?.value ? `margin-top: ${calculateWidth(mt["2xl"])};` : ""}
    ${mb?.["2xl"]?.value ? `margin-bottom: ${calculateWidth(mb["2xl"])};` : ""}

    &>div {
      ${v === "2xl" ? `width: 100% !important;` : ""}
      ${p?.["2xl"]?.value ? `padding: ${calculateWidth(p["2xl"])};` : ""}
    }

  @media (max-width: 1119px) {
    ${
      v === "xl"
        ? `flex-direction: ${ro === "xl" ? "column-reverse" : "column"};`
        : `${ro === "xl" ? `flex-direction: row-reverse;` : ""}`
    }
    ${w?.["xl"]?.value ? `width: ${calculateWidth(w["xl"])};` : ""}
    ${hv?.["xl"] === "expand-to-fill" ? `height: 100%;` : ""}
    ${
      hv?.["xl"] === "custom" && h?.["xl"]?.value
        ? `height: ${calculateWidth(h["xl"])};`
        : ""
    }
    ${gap?.["xl"]?.value ? `gap: ${calculateWidth(gap["xl"])};` : ""}
    ${mt?.["xl"]?.value ? `margin-top: ${calculateWidth(mt["xl"])};` : ""}
    ${mb?.["xl"]?.value ? `margin-bottom: ${calculateWidth(mb["xl"])};` : ""}

    &>div {
      ${
        v === "xl"
          ? `width: 100% !important;`
          : `${hw === "xl" ? `width: 50% !important;` : ""}`
      }
      ${p?.["xl"]?.value ? `padding: ${calculateWidth(p["xl"])};` : ""}
    }
  }

  @media (max-width: 1023px) {
    ${
      v === "lg"
        ? `flex-direction: ${ro === "lg" ? "column-reverse" : "column"};`
        : `${ro === "lg" ? `flex-direction: row-reverse;` : ""}`
    }
    ${w?.["lg"]?.value ? `width: ${calculateWidth(w["lg"])};` : ""}
    ${hv?.["lg"] === "expand-to-fill" ? `height: 100%;` : ""}
    ${
      hv?.["lg"] === "custom" && h?.["lg"]?.value
        ? `height: ${calculateWidth(h["lg"])};`
        : ""
    }
    ${gap?.["lg"]?.value ? `gap: ${calculateWidth(gap["lg"])};` : ""}
    ${mt?.["lg"]?.value ? `margin-top: ${calculateWidth(mt["lg"])};` : ""}
    ${mb?.["lg"]?.value ? `margin-bottom: ${calculateWidth(mb["lg"])};` : ""}

    &>div {
      ${
        v === "lg"
          ? `width: 100% !important;`
          : `${hw === "lg" ? `width: 50% !important;` : ""}`
      }
      ${p?.["lg"]?.value ? `padding: ${calculateWidth(p["lg"])};` : ""}
    }
  }

  @media (max-width: 767px) {
    ${
      v === "md"
        ? `flex-direction: ${ro === "md" ? "column-reverse" : "column"};`
        : `${ro === "md" ? `flex-direction: row-reverse;` : ""}`
    }
    ${w?.["md"]?.value ? `width: ${calculateWidth(w["md"])};` : ""}
    ${hv?.["md"] === "expand-to-fill" ? `height: 100%;` : ""}
    ${
      hv?.["md"] === "custom" && h?.["md"]?.value
        ? `height: ${calculateWidth(h["md"])};`
        : ""
    }
    ${gap?.["md"]?.value ? `gap: ${calculateWidth(gap["md"])};` : ""}
    ${mt?.["md"]?.value ? `margin-top: ${calculateWidth(mt["md"])};` : ""}
    ${mb?.["md"]?.value ? `margin-bottom: ${calculateWidth(mb["md"])};` : ""}

    &>div {
      ${
        v === "md"
          ? `width: 100% !important;`
          : `${hw === "md" ? `width: 50% !important;` : ""}`
      }
      ${p?.["md"]?.value ? `padding: ${calculateWidth(p["md"])};` : ""}
    }
  }

  @media (max-width: 479px) {
    ${
      v === "sm"
        ? `flex-direction: ${ro === "sm" ? "column-reverse" : "column"};`
        : `${ro === "sm" ? `flex-direction: row-reverse;` : ""}`
    }
    ${w?.["sm"]?.value ? `width: ${calculateWidth(w["sm"])};` : ""}
    ${hv?.["sm"] === "expand-to-fill" ? `height: 100%;` : ""}
    ${
      hv?.["sm"] === "custom" && h?.["sm"]?.value
        ? `height: ${calculateWidth(h["sm"])};`
        : ""
    }
    ${gap?.["sm"]?.value ? `gap: ${calculateWidth(gap["sm"])};` : ""}
    ${mt?.["sm"]?.value ? `margin-top: ${calculateWidth(mt["sm"])};` : ""}
    ${mb?.["sm"]?.value ? `margin-bottom: ${calculateWidth(mb["sm"])};` : ""}

    &>div {
      ${
        v === "sm"
          ? `width: 100% !important;`
          : `${hw === "sm" ? `width: 50% !important;` : ""}`
      }
      ${p?.["sm"]?.value ? `padding: ${calculateWidth(p["sm"])};` : ""}
    }
  }
`
);
