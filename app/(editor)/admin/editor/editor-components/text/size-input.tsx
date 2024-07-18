import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useNode } from "@craftjs/core";
import { useEditorContext } from "../../_ctx/editor-context";
import { MiniDeviceSelect } from "../../mini-device-select";
import { TextType } from "./types/text-type";
import { useCallback, useMemo, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const metrics = ["px", "em", "rem", "vw", "vh", "auto", "custom"] as const;

type Props = {
  sizes: TextType["width"];
  title: string;
  range: [number, number];
  object_key: string;
};

export const SizeInput = ({ sizes, title, range, object_key }: Props) => {
  const [open, setOpen] = useState(false);
  const { device } = useEditorContext();
  const {
    actions: { setProp },
  } = useNode();

  const setValue = useCallback(
    (value: string) => {
      setProp((props: any) => {
        props[object_key][device].value = value;
      });
    },
    [device, setProp, object_key]
  );

  const { metric, value } = useMemo(
    () =>
      sizes?.[device as keyof TextType["width"]] || {
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
    <Card className="p-2 pl-1 flex items-center justify-between group">
      <div className="flex items-center gap-1 w-1/2 relative">
        <span className="pl-3 text-xs">{title}</span>
        <button
          disabled={!isVisibleResetButton}
          className="absolute top-1/2 -translate-y-1/2 left-0 transition-opacity disabled:opacity-0"
          onClick={() =>
            setProp((props: any) => {
              props[object_key][device].metric = "px";
              delete props[object_key][device].value;
            })
          }
        >
          <Cross2Icon className="size-3" />
        </button>
        <MiniDeviceSelect />
      </div>
      <div className="w-1/2 flex items-center gap-2 justify-end">
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
      </div>
    </Card>
  );
};
