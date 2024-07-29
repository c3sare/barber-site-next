"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { useEditorContext } from "./_ctx/editor-context";
import { icons } from "./device-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getMaxAvailableWidth } from "./utils";
import { useFrameDeviceSize } from "./_ctx/frame-device-size-context";

export const MiniDeviceSelect = () => {
  const [open, setOpen] = useState(false);
  const { isOpenLayersBar, currentOpenBar } = useEditorContext();
  const { setFrameWidth, device } = useFrameDeviceSize();

  const currentIcon = useMemo(
    () => icons[device as keyof typeof icons],
    [device]
  );

  const Icon = useMemo(() => currentIcon.icon, [currentIcon]);

  const list = useMemo(
    () =>
      Object.keys(icons).map((key) => {
        const obj = icons[key as keyof typeof icons];

        const Icon = obj.icon;

        const active = device === key;

        return (
          <Button
            key={key}
            size="sm"
            variant="ghost"
            className={cn(
              "flex gap-4 items-center w-8 p-0",
              active && "bg-primary/10"
            )}
            onClick={() => {
              setFrameWidth(
                key === "2xl"
                  ? getMaxAvailableWidth(
                      obj.width,
                      isOpenLayersBar,
                      !!currentOpenBar
                    )
                  : obj.width
              );
              setOpen(false);
            }}
          >
            <Icon className={cn("size-4", obj.rotate && "rotate-90")} />
          </Button>
        );
      }),
    [device, setFrameWidth, isOpenLayersBar, currentOpenBar]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            "transition-opacity duration-500 bg-primary/0 p-0 w-8 opacity-0 group-hover:opacity-100",
            device !== "2xl" && "bg-primary/10",
            open && "opacity-100"
          )}
        >
          <Icon className={cn("size-4", currentIcon.rotate && "rotate-90")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-8 p-0 flex flex-col">{list}</PopoverContent>
    </Popover>
  );
};
