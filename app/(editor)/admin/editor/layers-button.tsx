"use client";

import { Button } from "@/components/ui/button";
import { Layers3Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorState } from "./stores/use-editor-state";
import { useShallow } from "zustand/shallow";

export const LayersButton = () => {
  const { toggleLayersBar, isOpenLayersBar } = useEditorState(
    useShallow((state) => ({
      toggleLayersBar: state.toggleLayersBar,
      isOpenLayersBar: state.isOpenLayersBar,
    }))
  );
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
