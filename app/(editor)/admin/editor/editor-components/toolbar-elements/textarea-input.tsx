import { Textarea } from "@/components/ui/textarea";
import { useNode } from "@craftjs/core";
import { ToolbarElement } from "../toolbar-element";
import { useCallback, useMemo } from "react";
import { safeObjectSet } from "@/lib/utils";
import { useFrameDeviceSize } from "../../stores/use-frame-device-size";

type Props = {
  title: string;
  object_key: string;
  placeholder?: string;
  withoutSizes?: boolean;
  hideResetButton?: boolean;
};

export const TextareaInput = ({
  title,
  object_key,
  placeholder,
  withoutSizes,
  hideResetButton,
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

  const isVisibleResetButton = useMemo(() => !!value, [value]);

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

  return (
    <ToolbarElement
      title={title}
      onClickReset={setValue}
      isVisibleResetButton={hideResetButton ? false : isVisibleResetButton}
      hideDeviceSelect={withoutSizes}
      hideResetButton={hideResetButton}
      column
    >
      <Textarea
        value={value ?? ""}
        className="resize-y"
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
    </ToolbarElement>
  );
};
