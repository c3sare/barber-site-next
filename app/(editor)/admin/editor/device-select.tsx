"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DesktopIcon } from "@radix-ui/react-icons";
import { SmartphoneIcon, TabletIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useEditorContext } from "./_ctx/editor-context";

const icons = {
  "2xl": {
    icon: DesktopIcon,
    rotate: false,
    name: "Desktop",
    desc: "All device widths",
    width: 1920,
  },
  xl: {
    icon: TabletIcon,
    rotate: true,
    name: "Tablet Landscape",
    desc: "1119px and below",
    width: 1024,
  },
  lg: {
    icon: TabletIcon,
    rotate: false,
    name: "Tablet Portrait",
    desc: "1023px and below",
    width: 768,
  },
  md: {
    icon: SmartphoneIcon,
    rotate: true,
    name: "Phone Landscape",
    desc: "767px and below",
    width: 480,
  },
  sm: {
    icon: SmartphoneIcon,
    rotate: false,
    name: "Phone Portrait",
    desc: "479px and below",
    width: 400,
  },
};

export const DeviceSelect = () => {
  const [device, setDevice] = useState<string>("2xl");
  const { frameWidth, setFrameWidth } = useEditorContext();

  useEffect(() => {
    if (frameWidth > 1119) {
      setDevice("2xl");
    } else if (frameWidth < 1119 && frameWidth > 1023) {
      setDevice("xl");
    } else if (frameWidth < 1023 && frameWidth > 767) {
      setDevice("lg");
    } else if (frameWidth < 767 && frameWidth > 479) {
      setDevice("md");
    } else {
      setDevice("sm");
    }
  }, [frameWidth]);

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
          <DropdownMenuRadioItem
            key={key}
            value={key}
            className={cn("flex gap-4 items-center", active && "bg-primary/10")}
            onClick={() => setFrameWidth(obj.width)}
          >
            <Icon className={cn("size-6", obj.rotate && "rotate-90")} />
            <div className="text-xs">
              <div>{obj.name}</div>
              <div className="text-gray-500">{obj.desc}</div>
            </div>
          </DropdownMenuRadioItem>
        );
      }),
    [device, setFrameWidth]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            "transition-colors duration-500 bg-primary/0",
            device !== "2xl" && "bg-primary/10"
          )}
        >
          <Icon className={cn("size-6", currentIcon.rotate && "rotate-90")} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuRadioGroup value={device} onValueChange={setDevice}>
          {list}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
