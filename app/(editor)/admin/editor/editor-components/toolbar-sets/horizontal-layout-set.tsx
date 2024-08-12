import {
  AlignCenterHorizontalIcon,
  AlignEndHorizontalIcon,
  AlignStartHorizontalIcon,
} from "lucide-react";
import { SelectInput } from "../toolbar-elements/select-input";
import { SelectToggle } from "../toolbar-elements/select-toggle";
import { SizeInput } from "../toolbar-elements/size-input";

export const HorizontalLayoutSet = () => {
  return (
    <>
      <SelectInput
        title="Align"
        object_key="horizontal.align"
        options={[
          {
            label: "Left",
            value: "flex-start",
          },
          {
            label: "Center",
            value: "center",
          },
          {
            label: "Right",
            value: "flex-end",
          },
          {
            label: "Space Around",
            value: "space-around",
          },
          {
            label: "Space Between",
            value: "space-between",
          },
        ]}
      />
      <SelectToggle
        title="Vertical Align"
        object_key="horizontal.valign"
        options={[
          {
            title: "Start",
            value: "flex-start",
            icon: <AlignStartHorizontalIcon />,
          },
          {
            title: "Center",
            value: "center",
            icon: <AlignCenterHorizontalIcon />,
          },
          {
            title: "End",
            value: "flex-end",
            icon: <AlignEndHorizontalIcon />,
          },
        ]}
      />
      <SizeInput title="Gap" object_key="horizontalverticalat" range={[0, 0]} />
      <SelectInput
        title="Vertical At"
        object_key="horizontal"
        withoutSizes
        options={[
          {
            label: "Desktop",
            value: "2xl",
          },
          {
            label: "Tablet Landscape",
            value: "xl",
          },
          {
            label: "Tablet Portrait",
            value: "lg",
          },
          {
            label: "Phone Landscape",
            value: "md",
          },
          {
            label: "Phone Portrait",
            value: "sm",
          },
        ]}
      />
    </>
  );
};
