import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ToolbarElement } from "../toolbar-element";
import { useNode } from "@craftjs/core";
import { useEditorContext } from "../../_ctx/editor-context";
import { useCallback, useMemo } from "react";
import { DeviceRecord } from "./types";

type Props = {
  options: {
    value: string;
    icon: React.ReactNode;
    title: string;
  }[];
  object_key: string;
  sizes: DeviceRecord<string>;
  title: string;
};

export const SelectToggle = ({ options, object_key, sizes, title }: Props) => {
  const { device } = useEditorContext();
  const {
    actions: { setProp },
  } = useNode();

  const setValue = useCallback(
    (value?: string) => {
      setProp((props: any) => {
        props[object_key][device] = value;
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
