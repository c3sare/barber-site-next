import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";
import { SelectInput } from "../toolbar-elements/select-input";
import { SelectToggle } from "../toolbar-elements/select-toggle";
import { SizeInput } from "../toolbar-elements/size-input";
import { TextareaInput } from "../toolbar-elements/textarea-input";

export const AdvancedGridSet = () => {
  return (
    <>
      <TextareaInput title="Grid" object_key="advancedgridgrid.grid" />
      <TextareaInput
        title="Grid Template"
        object_key="advancedgridgrid.gridTemplate"
      />
      <SizeInput title="Gap" object_key="advancedgridgrid.gap" range={[0, 0]} />
      <SizeInput
        title="Row Gap"
        object_key="advancedgridgrid.rowGap"
        range={[0, 0]}
      />
      <SelectInput
        title="Justify Items"
        object_key="advancedgridgrid.justifyItems"
        options={[
          {
            value: "start",
            label: "Start",
          },
          {
            value: "end",
            label: "End",
          },
          {
            value: "center",
            label: "Center",
          },
          {
            value: "stretch",
            label: "Stretch",
          },
        ]}
      />
      <SelectInput
        title="Align Items"
        object_key="advancedgridgrid.alignItems"
        options={[
          {
            value: "stretch",
            label: "Stretch",
          },
          {
            value: "flex-start",
            label: "Flex Start",
          },
          {
            value: "flex-end",
            label: "Flex End",
          },
          {
            value: "center",
            label: "Center",
          },
          {
            value: "baseline",
            label: "Baseline",
          },
        ]}
      />
      <SelectInput
        title="Justify Content"
        object_key="advancedgridgrid.justifyContent"
        options={[
          {
            value: "flex-start",
            label: "Flex Start",
          },
          {
            value: "flex-end",
            label: "Flex End",
          },
          {
            value: "center",
            label: "Center",
          },
          {
            value: "space-between",
            label: "Space Between",
          },
          {
            value: "space-around",
            label: "Space Around",
          },
          {
            value: "space-evenly",
            label: "Space Evenly",
          },
        ]}
      />
      <SelectInput
        title="Align Content"
        object_key="advancedgridgrid.alignContent"
        options={[
          {
            value: "flex-start",
            label: "Flex Start",
          },
          {
            value: "flex-end",
            label: "Flex End",
          },
          {
            value: "center",
            label: "Center",
          },
          {
            value: "space-between",
            label: "Space Between",
          },
          {
            value: "space-around",
            label: "Space Around",
          },
          {
            value: "stretch",
            label: "Stretch",
          },
          {
            value: "baseline",
            label: "Baseline",
          },
        ]}
      />
      <SizeInput
        title="Grid Auto Columns"
        object_key="advancedgridgrid.gridAutoColumns"
        range={[0, 0]}
      />
      <SizeInput
        title="Grid Auto Rows"
        object_key="advancedgridgrid.gridAutoRows"
        range={[0, 0]}
      />
      <SelectInput
        title="Grid Auto Flow"
        object_key="advancedgridgrid.gridAutoFlow"
        options={[
          {
            value: "row",
            label: "Row",
          },
          {
            value: "column",
            label: "Column",
          },
          {
            value: "row dense",
            label: "Row Dense",
          },
          {
            value: "column dense",
            label: "Column Dense",
          },
        ]}
      />
      <SelectToggle
        title="Text Align"
        object_key="advancedgridgrid.textAlign"
        options={[
          {
            value: "left",
            title: "Left",
            icon: <AlignLeftIcon />,
          },
          {
            value: "center",
            title: "Center",
            icon: <AlignCenterIcon />,
          },
          {
            value: "right",
            title: "Right",
            icon: <AlignRightIcon />,
          },
        ]}
      />
    </>
  );
};
