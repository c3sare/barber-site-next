import { styled } from "styled-components";
import {
  DeviceRecord,
  Devices,
  SingleWidthType,
} from "../toolbar-elements/types";
import { getSectionMaxWidth } from "../../helpers/getSectionMaxWidth";
import { getSectionHeight } from "../../helpers/getSectionHeight";
import { getProperty } from "../../helpers/getProperty";
import { PaddingType, getPadding } from "../../helpers/getPadding";
import {
  getBorderRadius,
  BorderRadiusType,
} from "../../helpers/getBorderRadius";
import { BorderType, getBorder } from "../../helpers/getBorder";
import {
  AdvancedDisplayVariantsType,
  AdvancedFlexLayoutType,
  AdvancedGridLayoutType,
  GridLayoutType,
  HorizontalLayoutType,
  LayoutType,
  VerticalLeyoutType,
  getLayout,
} from "../../helpers/getLayout";

type Props = {
  $layout?: LayoutType;
  $vertical?: DeviceRecord<VerticalLeyoutType>;
  $horizontal?: DeviceRecord<HorizontalLayoutType>;
  $horizontalVerticalAt?: Devices;
  $grid?: DeviceRecord<GridLayoutType>;
  $useOrginalItemDimensions?: boolean;
  $advancedGrid?: {
    display?: AdvancedDisplayVariantsType;
    flex?: DeviceRecord<AdvancedFlexLayoutType>;
    grid?: DeviceRecord<AdvancedGridLayoutType>;
  };
  $height?: DeviceRecord<"fit-content" | "viewport" | "custom">;
  $customHeight?: DeviceRecord<SingleWidthType>;
  $width?: DeviceRecord<"contained" | "full" | "custom">;
  $customWidth?: DeviceRecord<SingleWidthType>;
  $marginTop?: DeviceRecord<SingleWidthType>;
  $marginBottom?: DeviceRecord<SingleWidthType>;
  $padding?: DeviceRecord<PaddingType>;
  $borderRadius?: DeviceRecord<BorderRadiusType>;
  $border?: DeviceRecord<BorderType>;
};

export const StyledSection = styled.div<Props>(
  ({
    $width: w,
    $customWidth: cw,
    $height: h,
    $customHeight: customHeight,
    $marginTop: mt,
    $marginBottom: mb,
    $padding: p,
    $borderRadius: br,
    $border: b,
    $layout: layout,
    $vertical: vl,
    $horizontal: hl,
    $horizontalVerticalAt: hva,
    $grid: gl,
    $useOrginalItemDimensions: oid,
    $advancedGrid: agl,
  }) =>
    `
      margin: 0 auto;
      ${getSectionMaxWidth(w?.["2xl"], cw?.["2xl"])}
      ${getSectionHeight(h?.["2xl"], customHeight?.["2xl"])}
      ${getProperty("margin-top", mt?.["2xl"])}
      ${getProperty("margin-bottom", mb?.["2xl"])}
      ${getPadding(p?.["2xl"])}
      ${getBorderRadius(br?.["2xl"])}
      ${getBorder(b?.["2xl"])}
      ${getLayout(
        layout,
        vl?.["2xl"],
        hl?.["2xl"],
        hva === "2xl",
        gl?.["2xl"],
        oid,
        agl?.display,
        agl?.flex?.["2xl"],
        agl?.grid?.["2xl"]
      )}

      @media (max-width: 1119px) {
        ${getSectionMaxWidth(w?.["xl"], cw?.["xl"])}
        ${getSectionHeight(h?.["xl"], customHeight?.["xl"])}
        ${getProperty("margin-top", mt?.["xl"])}
        ${getProperty("margin-bottom", mb?.["xl"])}
        ${getPadding(p?.["xl"])}
        ${getBorderRadius(br?.["xl"])}
        ${getBorder(b?.["xl"])}
        ${getLayout(
          layout,
          vl?.["xl"],
          hl?.["xl"],
          hva === "xl",
          gl?.["xl"],
          oid,
          agl?.display,
          agl?.flex?.["xl"],
          agl?.grid?.["xl"]
        )}
      }

      @media (max-width: 1023px) {
        ${getSectionMaxWidth(w?.["lg"], cw?.["lg"])}
        ${getSectionHeight(h?.["lg"], customHeight?.["lg"])}
        ${getProperty("margin-top", mt?.["lg"])}
        ${getProperty("margin-bottom", mb?.["lg"])}
        ${getPadding(p?.["lg"])}
        ${getBorderRadius(br?.["lg"])}
        ${getBorder(b?.["lg"])}
        ${getLayout(
          layout,
          vl?.["lg"],
          hl?.["lg"],
          hva === "lg",
          gl?.["lg"],
          oid,
          agl?.display,
          agl?.flex?.["lg"],
          agl?.grid?.["lg"]
        )}
      }

      @media (max-width: 767px) {
        ${getSectionMaxWidth(w?.["md"], cw?.["md"])}
        ${getSectionHeight(h?.["md"], customHeight?.["md"])}
        ${getProperty("margin-top", mt?.["md"])}
        ${getProperty("margin-bottom", mb?.["md"])}
        ${getPadding(p?.["md"])}
        ${getBorderRadius(br?.["md"])}
        ${getBorder(b?.["md"])}
        ${getLayout(
          layout,
          vl?.["md"],
          hl?.["md"],
          hva === "md",
          gl?.["md"],
          oid,
          agl?.display,
          agl?.flex?.["md"],
          agl?.grid?.["md"]
        )}
      }

      @media (max-width: 479px) {
        ${getSectionMaxWidth(w?.["sm"], cw?.["sm"])}
        ${getSectionHeight(h?.["sm"], customHeight?.["sm"])}
        ${getProperty("margin-top", mt?.["sm"])}
        ${getProperty("margin-bottom", mb?.["sm"])}
        ${getPadding(p?.["sm"])}
        ${getBorderRadius(br?.["sm"])}
        ${getBorder(b?.["sm"])}
        ${getLayout(
          layout,
          vl?.["sm"],
          hl?.["sm"],
          hva === "sm",
          gl?.["sm"],
          oid,
          agl?.display,
          agl?.flex?.["sm"],
          agl?.grid?.["sm"]
        )}
      }
    `
);
