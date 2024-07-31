import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToolbarElement } from "../toolbar-element";
import { useNode } from "@craftjs/core";
import { useCallback, useMemo } from "react";
import { DeviceRecord } from "./types";
import { useFrameDeviceSize } from "../../stores/use-frame-device-size";

type Props = {
  options: Array<string | { value: string; label: string }>;
  placeholder?: string;
  object_key: string;
  title: string;
};

export const SelectInput = ({
  options,
  placeholder,
  object_key,
  title,
}: Props) => {
  const { device } = useFrameDeviceSize();
  const {
    actions: { setProp },
    sizes,
  } = useNode((node) => ({
    sizes: node.data.props[object_key],
  }));

  const setValue = useCallback(
    (value: string | undefined) => {
      setProp((props: any) => {
        props[object_key][device] = value;
      });
    },
    [device, setProp, object_key]
  );

  const value = useMemo(
    () => sizes?.[device as keyof DeviceRecord<string>],
    [sizes, device]
  );

  const isVisibleResetButton = useMemo(() => !!value, [value]);

  return (
    <ToolbarElement
      title={title}
      onClickReset={() => setValue(undefined)}
      {...{ isVisibleResetButton }}
    >
      <Select onValueChange={setValue} value={value ?? ""}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder ?? ""} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            const title = typeof option === "string" ? option : option.label;
            const value = typeof option === "string" ? option : option.value;

            return (
              <SelectItem value={value} key={value}>
                {title}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </ToolbarElement>
  );
};
