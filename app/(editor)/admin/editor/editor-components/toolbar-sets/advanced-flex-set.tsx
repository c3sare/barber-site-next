import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";
import { SelectInput } from "../toolbar-elements/select-input";
import { SelectToggle } from "../toolbar-elements/select-toggle";
import { SizeInput } from "../toolbar-elements/size-input";

export const AdvancedFlexSet = () => {
  return (
    <>
      <SelectInput
        title="Flex Direction"
        object_key="advancedflexgrid.flexDirection"
        options={[
          {
            value: "column",
            label: "Column",
          },
          {
            value: "row",
            label: "Row",
          },
          {
            value: "column-reverse",
            label: "Column Reverse",
          },
          {
            value: "row-reverse",
            label: "Row Reverse",
          },
        ]}
      />
      <SelectInput
        title="Align Items"
        object_key="advancedflexgrid.alignItems"
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
        object_key="advancedflexgrid.justifyContent"
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
        title="Flex Wrap"
        object_key="advancedflexgrid.flexWrap"
        options={[
          {
            value: "nowrap",
            label: "No Wrap",
          },
          {
            value: "wrap",
            label: "Wrap",
          },
          {
            value: "wrap-reverse",
            label: "Wrap Reverse",
          },
        ]}
      />
      <SelectInput
        title="Align Content"
        object_key="advancedflexgrid.alignContent"
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
      <SizeInput title="Gap" object_key="advancedflexgrid.gap" range={[0, 0]} />
      <SizeInput
        title="Row Gap"
        object_key="advancedflexgrid.rowGap"
        range={[0, 0]}
      />
      <SelectToggle
        title="Text Align"
        object_key="advancedflexgrid.textAlign"
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
