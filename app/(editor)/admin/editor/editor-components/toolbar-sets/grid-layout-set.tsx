import { NumberInput } from "../toolbar-elements/number-input";
import { SelectInput } from "../toolbar-elements/select-input";
import { SizeInput } from "../toolbar-elements/size-input";
import { SwitchInput } from "../toolbar-elements/switch-input";

export const GridLayoutSet = () => {
  return (
    <>
      <NumberInput title="Items per row" object_key="grid.itemsPerRow" />
      <SizeInput
        title="Space between Items"
        object_key="grid.gap"
        range={[0, 0]}
      />
      <SelectInput
        title="Item Vertical Alignment"
        object_key="grid.advanced.itemVerticalAlignment"
        options={[
          {
            label: "Stretch",
            value: "stretch",
          },
          {
            label: "Start",
            value: "flex-start",
          },
          {
            label: "Center",
            value: "center",
          },
          {
            label: "End",
            value: "flex-end",
          },
        ]}
      />
      <SelectInput
        title="Item Vertical Alignment"
        object_key="grid.advanced.itemHorizontalAlignment"
        options={[
          {
            label: "Stretch",
            value: "stretch",
          },
          {
            label: "Start",
            value: "flex-start",
          },
          {
            label: "Center",
            value: "center",
          },
          {
            label: "End",
            value: "flex-end",
          },
        ]}
      />
      <SwitchInput
        title="Use Orginal Item Dimensions"
        object_key="useorginalitemdimensions"
        withoutSizes
      />
    </>
  );
};
