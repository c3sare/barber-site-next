import { Slider } from "@/components/ui/slider";
import { cn, safeObjectSet } from "@/lib/utils";
import { useNode } from "@craftjs/core";
import { useCallback, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToolbarElement } from "../toolbar-element";
import { useFrameDeviceSize } from "../../stores/use-frame-device-size";

const metrics = ["px", "em", "rem", "vw", "vh", "auto", "custom"] as const;

type Props = {
  title: string;
  range: [number, number];
  object_key: string;
  hideDeviceSelect?: boolean;
  withoutSizes?: boolean;
};

export const SizeInput = ({
  title,
  range,
  object_key,
  hideDeviceSelect,
  withoutSizes,
}: Props) => {
  const [open, setOpen] = useState(false);
  const { device } = useFrameDeviceSize();
  const {
    actions: { setProp },
    objValue,
  } = useNode((node) => ({
    objValue: [
      object_key.split(".")[0],
      withoutSizes ? undefined : device,
      ...object_key.split(".").slice(1),
    ]
      .filter((item) => item)
      .reduce((o, k) => o?.[k as string], node.data.props) as any,
  }));

  const setValue = useCallback(
    (property: string, value?: string) => {
      setProp((props: any) => {
        const newProps = safeObjectSet(
          props,
          [
            object_key.split(".")[0],
            withoutSizes ? undefined : device,
            ...object_key.split(".").slice(1),
          ]
            .filter((item) => item)
            .join("."),
          {
            ...(objValue ? objValue : {}),
            ...(!objValue?.metric &&
            property !== "metric" &&
            value !== undefined
              ? { metric: "px" }
              : {}),
            [property]: value,
          }
        );
        props = newProps;
      });
    },
    [device, setProp, object_key, withoutSizes, objValue]
  );

  const { metric, value } = objValue ?? {
    metric: "px",
    value: "",
  };

  const isVisibleResetButton = useMemo(
    () => metric !== "px" || value,
    [metric, value]
  );

  return (
    <ToolbarElement
      isVisibleResetButton={!!isVisibleResetButton}
      onClickReset={() => setValue("value")}
      title={title}
      hideDeviceSelect={withoutSizes || hideDeviceSelect}
    >
      {range[0] !== range[1] && metric === "px" && (
        <Slider
          step={1}
          min={range[0]}
          max={range[1]}
          value={[value ? parseInt(value) : 0]}
          onValueChange={([value]) => setValue("value", value.toString())}
        />
      )}
      <div className="relative border rounded-sm p-1 flex gap-1 items-center">
        <input
          value={value ?? ""}
          disabled={metric === "auto"}
          onChange={(e) => setValue("value", e.target.value)}
          className={cn(
            "w-8 text-xs disabled:hidden",
            metric === "custom" && "w-12"
          )}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="text-[10px]">{metric}</PopoverTrigger>
          <PopoverContent className="flex flex-col p-1 justify-center gap-1 w-[60px]">
            {metrics.map((metric) => (
              <button
                key={metric}
                className="text-[10px] py-1"
                onClick={() => {
                  setValue("metric", metric);
                  setOpen(false);
                }}
              >
                {metric}
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </ToolbarElement>
  );
};
