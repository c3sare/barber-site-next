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
  withoutSizes?: boolean;
};

export const SelectInput = ({
  options,
  placeholder,
  object_key,
  title,
  withoutSizes,
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
        if (withoutSizes) {
          props[object_key] = value;
        } else {
          if (props[object_key]?.[device]) {
            if (!value) delete props[object_key][device];
            else props[object_key][device] = value;
          } else {
            props[object_key] = {
              ...props[object_key],
              [device]: value,
            };
          }
        }
      });
    },
    [device, setProp, object_key, withoutSizes]
  );

  const value = useMemo(() => {
    if (withoutSizes) {
      return sizes;
    } else {
      return sizes?.[device as keyof DeviceRecord<string>];
    }
  }, [sizes, device, withoutSizes]);

  const isVisibleResetButton = useMemo(() => !!value, [value]);

  return (
    <ToolbarElement
      title={title}
      onClickReset={() => setValue(undefined)}
      hideDeviceSelect={withoutSizes}
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
