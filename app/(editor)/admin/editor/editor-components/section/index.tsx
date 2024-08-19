"use client";

import { useNode } from "@craftjs/core";
import { StyledSection } from "./styled-section";
import { SectionToolbar } from "./toolbar";
import {
  AdvancedDisplayVariantsType,
  AdvancedFlexLayoutType,
  AdvancedGridLayoutType,
  GridLayoutType,
  HorizontalLayoutType,
  LayoutType,
  VerticalLeyoutType,
} from "../../helpers/getLayout";
import {
  DeviceRecord,
  Devices,
  SingleWidthType,
} from "../toolbar-elements/types";
import { PaddingType } from "../../helpers/getPadding";
import { BorderType } from "../../helpers/getBorder";
import { BorderRadiusType } from "../../helpers/getBorderRadius";
import { cn } from "@/lib/utils";
import { Children } from "react";

type Props = {
  children?: React.ReactNode;
  layout?: LayoutType;
  vertical?: DeviceRecord<VerticalLeyoutType>;
  horizontal?: DeviceRecord<HorizontalLayoutType>;
  horizontalverticalat?: Devices;
  grid?: DeviceRecord<GridLayoutType>;
  useorginalitemdimensions?: boolean;
  advancedgriddisplay?: AdvancedDisplayVariantsType;
  advancedflexgrid?: DeviceRecord<AdvancedFlexLayoutType>;
  advancedgridgrid?: DeviceRecord<AdvancedGridLayoutType>;
  height?: DeviceRecord<"fit-content" | "viewport" | "custom">;
  customheight?: DeviceRecord<SingleWidthType>;
  width?: DeviceRecord<"contained" | "full" | "custom">;
  customwidth?: DeviceRecord<SingleWidthType>;
  margintop?: DeviceRecord<SingleWidthType>;
  marginbottom?: DeviceRecord<SingleWidthType>;
  padding?: DeviceRecord<PaddingType>;
  borderradius?: DeviceRecord<BorderRadiusType>;
  border?: DeviceRecord<BorderType>;
};

export const Section = ({
  children,
  layout,
  vertical,
  horizontal,
  horizontalverticalat,
  grid,
  useorginalitemdimensions,
  advancedgriddisplay,
  advancedflexgrid,
  advancedgridgrid,
  height,
  customheight,
  width,
  customwidth,
  margintop,
  marginbottom,
  padding,
  borderradius,
  border,
}: Props) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <section
      className="w-full"
      ref={(ref) => {
        connect(ref!);
      }}
    >
      <StyledSection
        $border={border}
        $borderRadius={borderradius}
        $customHeight={customheight}
        $customWidth={customwidth}
        $grid={grid}
        $height={height}
        $horizontal={horizontal}
        $horizontalVerticalAt={horizontalverticalat}
        $layout={layout}
        $marginBottom={marginbottom}
        $marginTop={margintop}
        $padding={padding}
        $useOrginalItemDimensions={useorginalitemdimensions}
        $vertical={vertical}
        $width={width}
        $advancedGridDisplay={advancedgriddisplay}
        $advancedFlexGrid={advancedflexgrid}
        $advancedGridGrid={advancedgridgrid}
        className={cn(
          (!children || (children instanceof Array && children.length === 0)) &&
            "min-h-[400px]"
        )}
      >
        {children}
      </StyledSection>
    </section>
  );
};

Section.craft = {
  displayName: "Section",
  rules: {
    canDrop: () => true,
  },
  related: {
    toolbar: SectionToolbar,
  },
};
