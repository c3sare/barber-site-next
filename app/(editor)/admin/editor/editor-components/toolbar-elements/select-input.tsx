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
import { safeObjectSet } from "@/lib/utils";

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
    sizes: object_key.split(".").reduce((o, k) => o[k], node.data.props),
  }));

  const setValue = useCallback(
    (value: string | undefined) => {
      setProp((props: any) => {
        const newProps = safeObjectSet(
          props,
          `${object_key}${withoutSizes ? "" : "." + device}`,
          value
        );
        props = newProps;
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
