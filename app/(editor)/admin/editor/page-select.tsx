"use client";

import { getPages } from "@/actions/admin/menu/getPages";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEditor } from "@craftjs/core";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  pages: Awaited<ReturnType<typeof getPages>>;
};

export const PageSelect = ({ pages }: Props) => {
  const router = useRouter();
  const {
    actions: { selectNode },
  } = useEditor();
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="flex flex-col items-start pr-12 relative"
        >
          <span className="uppercase font-bold text-xs">EDITING PAGE</span>
          <span className="text-xs">
            {id
              ? pages.find((page) => page.id.toString() === id)?.name
              : "Select page..."}
          </span>
          <CaretSortIcon className="size-4 absolute right-1 top-1/2 -translate-y-1/2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command label="Select page">
          <CommandInput placeholder="Search pages..." className="h-9" />
          <CommandList>
            <CommandEmpty>No page found.</CommandEmpty>
            <CommandGroup>
              {pages.map((page) => (
                <CommandItem
                  key={page.id}
                  value={page.name}
                  onSelect={() => {
                    selectNode();
                    router.push(`/admin/editor/${page.id}`);
                    setOpen(false);
                  }}
                >
                  {page.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      id === page.id.toString() ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
