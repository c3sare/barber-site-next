import {
  SingleWidthType,
} from "../editor-components/toolbar-elements/types";
import { calculateWithMetrics } from "./calculateWithMetrics";

export type LayoutType = "vertical" | "horizontal" | "grid" | "advanced";

export type VerticalLeyoutType = {
  align?: "flex-start" | "center" | "flex-end";
  valign?: "flex-start" | "center" | "flex-end";
  gap?: SingleWidthType;
};

export type HorizontalLayoutType = {
  align?: "left" | "center" | "right" | "space-between" | "space-around";
  valign?: "start" | "center" | "end";
  gap?: SingleWidthType;
};

export type GridLayoutType = {
  itemsPerRow?: number;
  gap?: SingleWidthType;
  advanced?: {
    itemVerticalAlignment?: "stretch" | "start" | "center" | "end";
    itemHorizontalAlignment?: "stretch" | "start" | "center" | "end";
  };
};

export type AdvancedDisplayVariantsType = "flex" | "grid";

export type AdvancedFlexLayoutType = {
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  alignItems?: "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  alignContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "stretch"
    | "baseline";
  gap?: SingleWidthType;
  rowGap?: SingleWidthType;
  textAlign?: "left" | "center" | "right";
};

export type AdvancedGridLayoutType = {
  grid?: string;
  gridTemplate?: string;
  gap?: SingleWidthType;
  rowGap?: SingleWidthType;
  justifyItems?: "start" | "center" | "end" | "stretch";
  alignItems?: "start" | "center" | "end" | "stretch" | "baseline";
  justifyContent?:
    | "start"
    | "center"
    | "end"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignContent?:
    | "start"
    | "center"
    | "end"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";
  gridAutoColumns?: SingleWidthType;
  gridAutoRows?: SingleWidthType;
  gridAutoFlow?: "row" | "column" | "row dense" | "column dense";
  textAlign?: "left" | "center" | "right";
};

export const getLayout = (
  layout?: LayoutType,
  vertical?: VerticalLeyoutType,
  horizontal?: HorizontalLayoutType,
  verticalAtHorizontal?: boolean,
  grid?: GridLayoutType,
  useOrginalItemDimensions?: boolean,
  advanced?: AdvancedDisplayVariantsType,
  advancedFlex?: AdvancedFlexLayoutType,
  advancedGrid?: AdvancedGridLayoutType
) => {
  const properties: string[] = [];
  switch (layout) {
    case "vertical": {
      properties.push("display: flex;");
      properties.push("flex-direction: column;");
      properties.push(`align-items: ${vertical?.align ?? "center"};`);
      properties.push(`justify-content: ${vertical?.valign ?? "center"};`);
      if (vertical?.gap?.metric && vertical?.gap?.value)
        properties.push(`gap: ${calculateWithMetrics(vertical?.gap)};`);
      break;
    }

    case "horizontal": {
      properties.push("display: flex;");
      properties.push(
        `flex-direction: ${verticalAtHorizontal ? "column" : "row"};`
      );
      properties.push(`align-items: ${horizontal?.align ?? "center"};`);
      properties.push(`justify-content: ${horizontal?.valign ?? "center"};`);
      break;
    }

    case "grid": {
      properties.push("display: grid;");
      properties.push(
        `grid-template-columns: repeat(${
          grid?.itemsPerRow ?? 4
        }, minmax(0, 1fr));`
      );
      if (grid?.gap) properties.push(`gap: ${calculateWithMetrics(grid.gap)};`);
      properties.push(
        `align-items: ${grid?.advanced?.itemVerticalAlignment ?? "stretch"};`
      );
      properties.push(
        `justify-content: ${
          grid?.advanced?.itemHorizontalAlignment ?? "stretch"
        };`
      );
      if (useOrginalItemDimensions) {
        properties.push("&>* {max-width: 100%; margin: 0;}");
      } else {
        properties.push(
          "&>* {width: auto !important; height: auto !important;}"
        );
      }
      break;
    }

    case "advanced": {
      if (advanced === "flex") {
        properties.push("display: flex;");
        properties.push(
          `flex-direction: ${advancedFlex?.flexDirection ?? "column"};`
        );
        properties.push(
          `align-items: ${advancedFlex?.alignItems ?? "flex-start"};`
        );
        if (advancedFlex?.justifyContent)
          properties.push(`justify-content: ${advancedFlex?.justifyContent};`);

        if (advancedFlex?.flexWrap)
          properties.push(`flex-wrap: ${advancedFlex?.flexWrap};`);
        if (advancedFlex?.alignContent)
          properties.push(`align-content: ${advancedFlex?.alignContent};`);
        if (advancedFlex?.gap)
          properties.push(`gap: ${calculateWithMetrics(advancedFlex?.gap)};`);
        if (advancedFlex?.rowGap)
          properties.push(
            `row-gap: ${calculateWithMetrics(advancedFlex?.rowGap)};`
          );

        properties.push(`text-align: ${advancedFlex?.textAlign ?? "left"};`);
      } else if (advanced === "grid") {
        properties.push("display: grid;");
        properties.push(
          `align-items: ${advancedGrid?.alignItems ?? "flex-start"};`
        );
        if (advancedGrid?.grid) properties.push(`grid: ${advancedGrid?.grid};`);
        if (advancedGrid?.gridTemplate)
          properties.push(`grid-template: ${advancedGrid?.gridTemplate};`);
        if (advancedGrid?.gridAutoColumns)
          properties.push(
            `grid-auto-columns: ${calculateWithMetrics(
              advancedGrid.gridAutoColumns
            )};`
          );
        if (advancedGrid?.gridAutoRows)
          properties.push(
            `grid-auto-rows: ${calculateWithMetrics(
              advancedGrid.gridAutoRows
            )};`
          );
        if (advancedGrid?.gridAutoFlow)
          properties.push(`grid-auto-flow: ${advancedGrid.gridAutoFlow};`);
        if (advancedGrid?.justifyContent)
          properties.push(`justify-content: ${advancedGrid?.justifyContent};`);
        if (advancedGrid?.alignContent)
          properties.push(`align-content: ${advancedGrid?.alignContent};`);
        if (advancedGrid?.gap)
          properties.push(`gap: ${calculateWithMetrics(advancedGrid?.gap)};`);
        if (advancedGrid?.rowGap)
          properties.push(
            `row-gap: ${calculateWithMetrics(advancedGrid?.rowGap)};`
          );

        properties.push(`text-align: ${advancedGrid?.textAlign ?? "left"};`);
      }
      break;
    }
  }
  return properties.join("");
};
