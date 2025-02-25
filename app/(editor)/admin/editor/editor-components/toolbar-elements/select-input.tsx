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
    (value: string | undefined) =>
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
      })
    ,
    [device, setProp, object_key, withoutSizes]
  );

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
