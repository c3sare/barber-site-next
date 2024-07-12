"use client";

import { Button } from "@/components/ui/button";
import { useEditorContext } from "./_ctx/editor-context";
import { Layers } from "@craftjs/layers";
import { XIcon } from "lucide-react";

export const LayersBar = () => {
  const { isOpenLayersBar, toggleLayersBar } = useEditorContext();

  return (
    isOpenLayersBar && (
      <div className="w-[300px] bg-background border-l h-full">
        <div className="border-b px-2 py-4 flex justify-between items-center">
          <span className="text-base font-bold">Structure</span>
          <Button variant="ghost" size="icon" onClick={toggleLayersBar}>
            <XIcon className="size-4" />
          </Button>
        </div>
        <Layers />
      </div>
    )
  );
};
