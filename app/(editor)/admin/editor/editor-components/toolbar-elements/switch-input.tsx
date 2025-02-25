import { Switch } from "@/components/ui/switch";
import { ToolbarElement } from "../toolbar-element";
import { useFrameDeviceSize } from "../../stores/use-frame-device-size";
import { useNode } from "@craftjs/core";
import { useCallback, useMemo } from "react";
import { safeObjectSet } from "@/lib/utils";

type Props = {
  title: string;
  object_key: string;
  withoutSizes?: boolean;
};

export const SwitchInput = ({ title, object_key, withoutSizes }: Props) => {
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
    (value?: boolean) => {
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
      onClickReset={setValue}
      isVisibleResetButton={isVisibleResetButton}
    >
      <Switch checked={value ?? false} onCheckedChange={setValue} />
    </ToolbarElement>
  );
};
