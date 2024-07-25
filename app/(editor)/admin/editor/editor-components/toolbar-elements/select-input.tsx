import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToolbarElement } from "../toolbar-element";
import { useEditorContext } from "../../_ctx/editor-context";
import { useNode } from "@craftjs/core";
import { useCallback, useMemo } from "react";
import { DeviceRecord } from "./types";

type Props = {
  sizes: DeviceRecord<string>;
  options: Array<string | { value: string; label: string }>;
  placeholder?: string;
  object_key: string;
  title: string;
  defaultValue?: string;
};

export const SelectInput = ({
  options,
  placeholder,
  object_key,
  sizes,
  title,
  defaultValue,
}: Props) => {
  const { device } = useEditorContext();
  const {
    actions: { setProp },
  } = useNode();

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
      <Select onValueChange={setValue} value={value ?? defaultValue}>
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
