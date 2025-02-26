import { useNode } from "@craftjs/core";
import { ToolbarElement } from "../toolbar-element";
import { useFrameDeviceSize } from "../../stores/use-frame-device-size";
import { useCallback, useMemo } from "react";
import { safeObjectSet } from "@/lib/utils";

type Props = {
  title: string;
  object_key: string;
  withoutSizes?: boolean;
};

export const NumberInput = ({ title, object_key, withoutSizes }: Props) => {
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
      title={title}
      isVisibleResetButton={isVisibleResetButton}
      onClickReset={setValue}
    >
      <input
        type="number"
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        className="border rounded-xs p-1 w-20"
      />
    </ToolbarElement>
  );
};
