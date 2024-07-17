import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useNode } from "@craftjs/core";
import { useEditorContext } from "../../_ctx/editor-context";
import { MiniDeviceSelect } from "../../mini-device-select";
import { TextType } from "./types/text-type";
import { useCallback, useMemo } from "react";

const metrics = ["px", "em", "rem", "vw", "vh", "auto", "custom"] as const;

export const WidthInput = ({ width }: { width: TextType["width"] }) => {
  const { device } = useEditorContext();
  const {
    actions: { setProp },
  } = useNode();

  const setValue = useCallback(
    (value: string) => {
      setProp((props: any) => {
        props.width[device].value = value;
      });
    },
    [device, setProp]
  );

  const { metric, value } = useMemo(
    () =>
      width?.[device as keyof TextType["width"]] || {
        metric: "px",
        value: "",
      },
    [width, device]
  );

  return (
    <Card className="p-2 flex items-center justify-between">
      <div className="flex items-center gap-1 w-1/2">
        <span>Width</span>
        <MiniDeviceSelect />
      </div>
      <div className="w-1/2 flex items-center gap-2 justify-end">
        {metric === "px" && (
          <Slider
            step={1}
            min={0}
            max={1200}
            value={[parseInt(value)]}
            onValueChange={([value]) => setValue(value.toString())}
          />
        )}
        <div className="relative border rounded-sm p-1 flex gap-1 items-center">
          <input
            value={value}
            disabled={metric === "auto"}
            onChange={(e) => setValue(e.target.value)}
            className={cn(
              "w-8 text-xs disabled:hidden",
              metric === "custom" && "w-12"
            )}
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="text-xs">
              {metric}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {metrics.map((metric) => (
                <DropdownMenuItem
                  key={metric}
                  onClick={() =>
                    setProp((props: any) => {
                      props.width[device].metric = metric;
                    })
                  }
                >
                  {metric}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};
