import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
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
};

export const SizeInput = ({
  title,
  range,
  object_key,
  hideDeviceSelect,
}: Props) => {
  const [open, setOpen] = useState(false);
  const { device } = useFrameDeviceSize();
  const {
    actions: { setProp },
    sizes,
  } = useNode((node) => ({
    sizes: node.data.props[object_key],
  }));

  const setValue = useCallback(
    (value: string) => {
      setProp((props: any) => {
        if (props[object_key]?.[device]) {
          if (!value) delete props[object_key][device];
          else props[object_key][device].value = value;
        } else {
          props[object_key] = {
            ...props[object_key],
            [device]: {
              metric: "px",
              value: value,
            },
          };
        }
      });
    },
    [device, setProp, object_key]
  );

  const { metric, value } = useMemo(
    () =>
      sizes?.[device as keyof typeof sizes] || {
        metric: "px",
        value: "",
      },
    [sizes, device]
  );

  const isVisibleResetButton = useMemo(
    () => metric !== "px" || value,
    [metric, value]
  );

  return (
    <ToolbarElement
      isVisibleResetButton={!!isVisibleResetButton}
      onClickReset={() =>
        setProp((props: any) => {
          props[object_key][device].metric = "px";
          delete props[object_key][device];
        })
      }
      title={title}
      hideDeviceSelect={hideDeviceSelect}
    >
      {range[0] !== range[1] && metric === "px" && (
        <Slider
          step={1}
          min={range[0]}
          max={range[1]}
          value={[value ? parseInt(value) : 0]}
          onValueChange={([value]) => setValue(value.toString())}
        />
      )}
      <div className="relative border rounded-sm p-1 flex gap-1 items-center">
        <input
          value={value ?? ""}
          disabled={metric === "auto"}
          onChange={(e) => setValue(e.target.value)}
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
                  setProp((props: any) => {
                    props[object_key][device].metric = metric;
                  });
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
