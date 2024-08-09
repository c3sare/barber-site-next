import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ToolbarElement } from "../toolbar-element";
import { useNode } from "@craftjs/core";
import { useCallback, useMemo } from "react";
import { useFrameDeviceSize } from "../../stores/use-frame-device-size";

type Props = {
  options: {
    value: string;
    icon: React.ReactNode;
    title: string;
  }[];
  object_key: string;
  title: string;
};

export const SelectToggle = ({ options, object_key, title }: Props) => {
  const { device } = useFrameDeviceSize();
  const {
    actions: { setProp },
    sizes,
  } = useNode((node) => ({
    sizes: node.data.props[object_key],
  }));

  const setValue = useCallback(
    (value?: string) => {
      setProp((props: any) => {
        if (props[object_key]?.[device]) {
          if (!value) delete props[object_key][device];
          else props[object_key][device] = value;
        } else {
          props[object_key] = {
            ...props[object_key],
            [device]: value,
          };
        }
      });
    },
    [device, setProp, object_key]
  );

  const value = useMemo(
    () => sizes?.[device as keyof typeof sizes],
    [sizes, device]
  );

  const isVisibleResetButton = useMemo(() => !!value, [value]);

  return (
    <ToolbarElement
      isVisibleResetButton={isVisibleResetButton}
      onClickReset={() => setValue()}
      title={title}
    >
      <ToggleGroup
        size="sm"
        variant="outline"
        type="single"
        value={value}
        onValueChange={setValue}
      >
        {options.map((option) => (
          <ToggleGroupItem
            value={option.value}
            aria-label={option.title}
            key={option.value}
            className="[&>svg]:size-3"
          >
            {option.icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </ToolbarElement>
  );
};
