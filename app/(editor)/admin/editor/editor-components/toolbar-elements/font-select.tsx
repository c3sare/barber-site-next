"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFonts } from "../../_ctx/fonts-context";
import { ToolbarElement } from "../toolbar-element";
import { Virtuoso } from "react-virtuoso";
import { Input } from "@/components/ui/input";
import { DeviceRecord } from "./types";
import { useNode } from "@craftjs/core";
import { useEditorContext } from "../../_ctx/editor-context";
import { useCallback, useMemo } from "react";

type Props = {
  title: string;
  object_key: string;
  sizes: DeviceRecord<string>;
};

export function FontSelect({ title, object_key, sizes }: Props) {
  const { device } = useEditorContext();
  const {
    actions: { setProp },
  } = useNode();
  const { fonts, usedFonts, setUsedFonts } = useFonts();
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const setValue = useCallback(
    (value?: string) => {
      if (value && usedFonts.indexOf(value) === -1)
        setUsedFonts([...usedFonts, value]);

      setProp((props: any) => {
        props[object_key][device] = value;
      });
    },
    [device, setProp, object_key, usedFonts, setUsedFonts]
  );

  const value = useMemo(
    () => sizes?.[device as keyof typeof sizes],
    [sizes, device]
  );

  const isVisibleResetButton = useMemo(() => !!value, [value]);

  const filteredFonts = fonts.filter((item) =>
    item.family.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ToolbarElement
      title={title}
      isVisibleResetButton={isVisibleResetButton}
      onClickReset={() => setValue()}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? fonts.find((font) => font.family === value)?.family
              : "Select font..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <Input
              className="rounded-b-none focus-visible::outline-none focus-visible:ring-0"
              placeholder="Search font..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <CommandList>
              <CommandEmpty>No font found.</CommandEmpty>
              {filteredFonts.length > 0 && (
                <Virtuoso
                  style={{ height: 250 }}
                  totalCount={filteredFonts.length}
                  itemContent={(index) => (
                    <CommandItem
                      key={filteredFonts[index].family}
                      value={filteredFonts[index].family}
                      onSelect={(currentValue) => {
                        setValue(
                          currentValue === value ? undefined : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === filteredFonts[index].family
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {filteredFonts[index].family}
                    </CommandItem>
                  )}
                />
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </ToolbarElement>
  );
}
