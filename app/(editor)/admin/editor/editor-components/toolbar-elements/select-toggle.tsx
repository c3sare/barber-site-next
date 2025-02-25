import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ToolbarElement } from "../toolbar-element";
import { useNode } from "@craftjs/core";
import { useCallback, useMemo } from "react";
import { useFrameDeviceSize } from "../../stores/use-frame-device-size";
import { safeObjectSet } from "@/lib/utils";

type Props = {
  options: {
    value: string;
    icon: React.ReactNode;
    title: string;
  }[];
  object_key: string;
  title: string;
  withoutSizes?: boolean;
};

export const SelectToggle = ({
  options,
  object_key,
  title,
  withoutSizes,
}: Props) => {
  const { device } = useFrameDeviceSize();
  const {
    actions: { setProp },
    value,
  } = useNode((node) => ({
    value: [
      object_key.split(".")[0],
      withoutSizes ? undefined : device,
      ...object_key.split(".").slice(1),
    ]
      .filter((item) => item)
      .reduce((o, k) => o?.[k as string], node.data.props) as never,
  }));

  const setValue = useCallback(
    (value?: string) => {
      setProp((props: never) => {
        const newProps = safeObjectSet(
          props,
          [
            object_key.split(".")[0],
            withoutSizes ? undefined : device,
            ...object_key.split(".").slice(1),
          ]
            .filter((item) => item)
            .join("."),
          value as unknown as never
        );
        props = newProps;
      });
    },
    [device, setProp, object_key, withoutSizes]
  );

  const isVisibleResetButton = useMemo(() => !!value, [value]);

  return (
    <ToolbarElement
      isVisibleResetButton={isVisibleResetButton}
      onClickReset={() => setValue()}
      title={title}
      hideDeviceSelect={withoutSizes}
    >
      <ToggleGroup
        size="sm"
        variant="outline"
        type="single"
        value={value ?? ""}
        onValueChange={setValue}
      >
        {options.map((option) => (
          <ToggleGroupItem
            value={option.value}
            aria-label={option.title}
            key={option.value}
            className="[&>svg]:size-3 text-xs"
          >
            {option.icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </ToolbarElement>
  );
};
