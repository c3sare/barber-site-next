import { styled } from "styled-components";
import {
  DeviceRecord,
  Devices,
  SingleWidthType,
} from "../toolbar-elements/types";
import { getSectionMaxWidth } from "../../helpers/getSectionMaxWidth";
import { getSectionHeight } from "../../helpers/getSectionHeight";

type Border = {
  width?: SingleWidthType;
  color?: string;
  style?: "solid" | "dashed" | "dotted" | "none";
};

type Props = {
  $layout?: "vertical" | "horizontal" | "grid" | "advanced";
  $vertical?: {
    align?: DeviceRecord<"left" | "center" | "right">;
    valign?: DeviceRecord<"top" | "center" | "bottom">;
    gap?: DeviceRecord<SingleWidthType>;
  };
  $horizontal?: {
    align?: DeviceRecord<
      "left" | "center" | "right" | "space-between" | "space-around"
    >;
    valign?: DeviceRecord<"start" | "center" | "end">;
    gap?: DeviceRecord<SingleWidthType>;
    verticalAt?: Devices;
  };
  $grid?: {
    itemsPerRow?: DeviceRecord<number>;
    gap?: DeviceRecord<SingleWidthType>;
    advanced?: {
      itemVerticalAlignment?: DeviceRecord<
        "stretch" | "start" | "center" | "end"
      >;
      itemHorizontalAlignment?: DeviceRecord<
        "stretch" | "start" | "center" | "end"
      >;
      useOrginalItemDimensions?: boolean;
    };
  };
  $advancedGrid?: {
    display?: "flex" | "grid";
    flex?: {
      flexDirection?: DeviceRecord<
        "row" | "column" | "row-reverse" | "column-reverse"
      >;
      alignItems?: DeviceRecord<
        "stretch" | "flex-start" | "center" | "flex-end" | "baseline"
      >;
      justifyContent?: DeviceRecord<
        | "flex-start"
        | "center"
        | "flex-end"
        | "space-between"
        | "space-around"
        | "space-evenly"
      >;
      flexWrap?: DeviceRecord<"nowrap" | "wrap" | "wrap-reverse">;
      alignContent?: DeviceRecord<
        | "flex-start"
        | "center"
        | "flex-end"
        | "space-between"
        | "space-around"
        | "stretch"
        | "baseline"
      >;
      gap?: DeviceRecord<SingleWidthType>;
      rowGap?: DeviceRecord<SingleWidthType>;
      textAlign?: DeviceRecord<"left" | "center" | "right">;
    };
    grid?: {
      grid?: DeviceRecord<string>;
      gridTemplate?: DeviceRecord<string>;
      gap?: DeviceRecord<SingleWidthType>;
      rowGap?: DeviceRecord<SingleWidthType>;
      justifyItems?: DeviceRecord<"start" | "center" | "end" | "stretch">;
      alignItems?: DeviceRecord<
        "start" | "center" | "end" | "stretch" | "baseline"
      >;
      justifyContent?: DeviceRecord<
        | "start"
        | "center"
        | "end"
        | "stretch"
        | "space-between"
        | "space-around"
        | "space-evenly"
      >;
      alignContent?: DeviceRecord<
        | "start"
        | "center"
        | "end"
        | "stretch"
        | "space-between"
        | "space-around"
        | "space-evenly"
      >;
      gridAutoColumns?: DeviceRecord<SingleWidthType>;
      gridAutoFlow?: DeviceRecord<SingleWidthType>;
      textAlign?: DeviceRecord<"left" | "center" | "right">;
    };
  };
  $height?: DeviceRecord<"fit-content" | "viewport" | "custom">;
  $customHeight?: DeviceRecord<SingleWidthType>;
  $width?: DeviceRecord<"contained" | "full" | "custom">;
  $customWidth?: DeviceRecord<SingleWidthType>;
  $marginTop?: DeviceRecord<SingleWidthType>;
  $marginBottom?: DeviceRecord<SingleWidthType>;
  $padding?: {
    top?: DeviceRecord<SingleWidthType>;
    bottom?: DeviceRecord<SingleWidthType>;
    left?: DeviceRecord<SingleWidthType>;
    right?: DeviceRecord<SingleWidthType>;
  };
  $borderRadius?: {
    topLeft?: DeviceRecord<SingleWidthType>;
    topRight?: DeviceRecord<SingleWidthType>;
    bottomLeft?: DeviceRecord<SingleWidthType>;
    bottomRight?: DeviceRecord<SingleWidthType>;
  };
  $border?: DeviceRecord<{
    top?: Border;
    bottom?: Border;
    left?: Border;
    right?: Border;
  }>;
};

export const StyledSection = styled.section<Props>(
  ({ $width: w, $customWidth: cw, $height: h, $customHeight: customHeight }) =>
    `
        ${getSectionMaxWidth(w?.["2xl"], cw?.["2xl"])}
        ${getSectionHeight(h?.["2xl"], customHeight?.["2xl"])}

        @media (max-width: 1119px) {
            ${getSectionMaxWidth(w?.["xl"], cw?.["xl"])}
            ${getSectionHeight(h?.["xl"], customHeight?.["xl"])}
        }

        @media (max-width: 1023px) {
            ${getSectionMaxWidth(w?.["lg"], cw?.["lg"])}
            ${getSectionHeight(h?.["lg"], customHeight?.["lg"])}
        }

        @media (max-width: 767px) {
            ${getSectionMaxWidth(w?.["md"], cw?.["md"])}
            ${getSectionHeight(h?.["md"], customHeight?.["md"])}
        }

        @media (max-width: 479px) {
            ${getSectionMaxWidth(w?.["sm"], cw?.["sm"])}
            ${getSectionHeight(h?.["sm"], customHeight?.["sm"])}
        }
    `
);
