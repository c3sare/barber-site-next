import { styled } from "styled-components";
import {
  DeviceRecord,
  Devices,
  MultiDeviceWidthType,
} from "../toolbar-elements/types";
import { getWidth } from "../text/utils";

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
    $vertical: v,
    $halfWidth: hw,
    $reverseOrder: ro,
    $width: w,
    $heightVariant: hv,
    $height: h,
    $columnGap: gap,
    $columnPadding: p,
    $marginBottom: mb,
    $marginTop: mt,
    $columnsCount: cc = 1,
  }) => `
    ${
      v === "2xl"
        ? `flex-direction: ${ro === "2xl" ? "column-reverse" : "column"};`
        : `${ro === "2xl" ? `flex-direction: row-reverse;` : ""}`
    }
    ${w?.["2xl"]?.value ? `width: ${getWidth(w["2xl"])};` : ""}
    ${hv?.["2xl"] === "expand-to-fill" ? `height: 100%;` : ""}
    ${
      hv?.["2xl"] === "custom" && h?.["2xl"]?.value
        ? `height: ${getWidth(h["2xl"])};`
        : ""
    }
    gap: ${gap?.["2xl"]?.value ? getWidth(gap["2xl"]) : "32px"};
    ${mt?.["2xl"]?.value ? `margin-top: ${getWidth(mt["2xl"])};` : ""}
    ${mb?.["2xl"]?.value ? `margin-bottom: ${getWidth(mb["2xl"])};` : ""}

    &>div {
      ${
        v === "2xl"
          ? `width: 100%;`
          : `${
              hw === "2xl"
                ? `width: calc(50% - ${
                    gap?.["2xl"]?.value ? getWidth(gap["2xl"]) : "32px"
                  });`
                : `width: calc(100% / ${cc} - ${
                    gap?.["2xl"]?.value ? getWidth(gap["2xl"]) : "32px"
                  });`
            }`
      }
      ${p?.["2xl"]?.value ? `padding: ${getWidth(p["2xl"])};` : ""}
    }

  @media (max-width: 1119px) {
    ${
      v === "xl"
        ? `flex-direction: ${ro === "xl" ? "column-reverse" : "column"};`
        : `${ro === "xl" ? `flex-direction: row-reverse;` : ""}`
    }
    ${w?.["xl"]?.value ? `width: ${getWidth(w["xl"])};` : ""}
    ${hv?.["xl"] === "expand-to-fill" ? `height: 100%;` : ""}
    ${
      hv?.["xl"] === "custom" && h?.["xl"]?.value
        ? `height: ${getWidth(h["xl"])};`
        : ""
    }
    ${gap?.["xl"]?.value ? `gap: ${getWidth(gap["xl"])};` : ""}
    ${mt?.["xl"]?.value ? `margin-top: ${getWidth(mt["xl"])};` : ""}
    ${mb?.["xl"]?.value ? `margin-bottom: ${getWidth(mb["xl"])};` : ""}

    &>div {
      ${v === "xl" ? `width: 100%;` : `${hw === "xl" ? `width: 50%;` : ""}`}
      ${p?.["xl"]?.value ? `padding: ${getWidth(p["xl"])};` : ""}
    }
  }

  @media (max-width: 1023px) {
    ${
      v === "lg"
        ? `flex-direction: ${ro === "lg" ? "column-reverse" : "column"};`
        : `${ro === "lg" ? `flex-direction: row-reverse;` : ""}`
    }
    ${w?.["lg"]?.value ? `width: ${getWidth(w["lg"])};` : ""}
    ${hv?.["lg"] === "expand-to-fill" ? `height: 100%;` : ""}
    ${
      hv?.["lg"] === "custom" && h?.["lg"]?.value
        ? `height: ${getWidth(h["lg"])};`
        : ""
    }
    ${gap?.["lg"]?.value ? `gap: ${getWidth(gap["lg"])};` : ""}
    ${mt?.["lg"]?.value ? `margin-top: ${getWidth(mt["lg"])};` : ""}
    ${mb?.["lg"]?.value ? `margin-bottom: ${getWidth(mb["lg"])};` : ""}

    &>div {
      ${v === "lg" ? `width: 100%;` : `${hw === "lg" ? `width: 50%;` : ""}`}
      ${p?.["lg"]?.value ? `padding: ${getWidth(p["lg"])};` : ""}
    }
  }

  @media (max-width: 767px) {
    ${
      v === "md"
        ? `flex-direction: ${ro === "md" ? "column-reverse" : "column"};`
        : `${ro === "md" ? `flex-direction: row-reverse;` : ""}`
    }
    ${w?.["md"]?.value ? `width: ${getWidth(w["md"])};` : ""}
    ${hv?.["md"] === "expand-to-fill" ? `height: 100%;` : ""}
    ${
      hv?.["md"] === "custom" && h?.["md"]?.value
        ? `height: ${getWidth(h["md"])};`
        : ""
    }
    ${gap?.["md"]?.value ? `gap: ${getWidth(gap["md"])};` : ""}
    ${mt?.["md"]?.value ? `margin-top: ${getWidth(mt["md"])};` : ""}
    ${mb?.["md"]?.value ? `margin-bottom: ${getWidth(mb["md"])};` : ""}

    &>div {
      ${v === "md" ? `width: 100%;` : `${hw === "md" ? `width: 50%;` : ""}`}
      ${p?.["md"]?.value ? `padding: ${getWidth(p["md"])};` : ""}
    }
  }

  @media (max-width: 479px) {
    ${
      v === "sm"
        ? `flex-direction: ${ro === "sm" ? "column-reverse" : "column"};`
        : `${ro === "sm" ? `flex-direction: row-reverse;` : ""}`
    }
    ${w?.["sm"]?.value ? `width: ${getWidth(w["sm"])};` : ""}
    ${hv?.["sm"] === "expand-to-fill" ? `height: 100%;` : ""}
    ${
      hv?.["sm"] === "custom" && h?.["sm"]?.value
        ? `height: ${getWidth(h["sm"])};`
        : ""
    }
    ${gap?.["sm"]?.value ? `gap: ${getWidth(gap["sm"])};` : ""}
    ${mt?.["sm"]?.value ? `margin-top: ${getWidth(mt["sm"])};` : ""}
    ${mb?.["sm"]?.value ? `margin-bottom: ${getWidth(mb["sm"])};` : ""}

    &>div {
      ${v === "sm" ? `width: 100%;` : `${hw === "sm" ? `width: 50%;` : ""}`}
      ${p?.["sm"]?.value ? `padding: ${getWidth(p["sm"])};` : ""}
    }
  }
`
);
