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
import { useState } from "react";

const icons = {
    "2xl": { icon: DesktopIcon, rotate: false, name: "Desktop", desc: "All device widths" },
    xl: { icon: TabletIcon, rotate: true, name: "Tablet Landscape", desc: "1119px and below" },
    lg: { icon: TabletIcon, rotate: false, name: "Tablet Portrait", desc: "1023px and below" },
    md: { icon: SmartphoneIcon, rotate: true, name: "Phone Landscape", desc: "767px and below" },
    sm: { icon: SmartphoneIcon, rotate: false, name: "Phone Portrait", desc: "479px and below" },
  };

export const DeviceSelect = () => {
  const [device, setDevice] = useState<string>("2xl");

  const currentIcon = icons[device as keyof typeof icons];

  const Icon = currentIcon.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <Icon className={cn("size-6", currentIcon.rotate && "rotate-90")} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuRadioGroup value={device} onValueChange={setDevice}>
          {Object.keys(icons).map((key) => {
            const obj = icons[key as keyof typeof icons];

            const Icon = obj.icon;

            return (
              <DropdownMenuRadioItem
                key={key}
                value={key}
                className="flex gap-4 items-center"
              >
                <Icon className={cn("size-6", obj.rotate && "rotate-90")} />
                <div className="text-xs">
                  <div>{obj.name}</div>
                  <div className="text-gray-500">{obj.desc}</div>
                </div>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
