import {
  AlignCenterHorizontalIcon,
  AlignCenterVerticalIcon,
  AlignEndHorizontalIcon,
  AlignEndVerticalIcon,
  AlignStartHorizontalIcon,
  AlignStartVerticalIcon,
} from "lucide-react";
import { SelectToggle } from "../toolbar-elements/select-toggle";
import { SizeInput } from "../toolbar-elements/size-input";

export const VerticalLayoutSet = () => {
  return (
    <>
      <SelectToggle
        title="Align"
        object_key="vertical.align"
        options={[
          {
            title: "Left",
            value: "flex-start",
            icon: <AlignStartVerticalIcon />,
          },
          {
            title: "Center",
            value: "center",
            icon: <AlignCenterVerticalIcon />,
          },
          {
            title: "Right",
            value: "flex-end",
            icon: <AlignEndVerticalIcon />,
          },
        ]}
      />
      <SelectToggle
        title="Vertical Align"
        object_key="vertical.valign"
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
      <SizeInput title="Gap" object_key="vertical.gap" range={[0, 0]} />
    </>
  );
};
