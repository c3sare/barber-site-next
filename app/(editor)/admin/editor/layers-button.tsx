"use client";

import { Button } from "@/components/ui/button";
import { useEditorContext } from "./_ctx/editor-context";
import { Layers3Icon } from "lucide-react";
import { cn } from "@/lib/utils";

export const LayersButton = () => {
  const { toggleLayersBar, isOpenLayersBar } = useEditorContext();
  return (
    <Button
      onClick={toggleLayersBar}
      size="sm"
      variant="ghost"
      className={cn(isOpenLayersBar && "bg-primary/10")}
    >
      <Layers3Icon />
    </Button>
  );
};
