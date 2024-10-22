"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PencilRulerIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditor } from "@craftjs/core";
import { useEffect, useState } from "react";
import { useEditorState } from "./stores/use-editor-state";

export const BarButtons = () => {
  const [firstMount, setFirstMount] = useState(true);
  const { selectededNodeId, currentNode } = useEditor((state) => {
    const key = state.events.selected.values().next().value;

    return {
      selectededNodeId: state.events.selected,
      currentNode: key ? state.nodes?.[key] : undefined,
    };
  });
  const { currentOpenBar, toggleBar, openBar } = useEditorState();

  useEffect(() => {
    if (firstMount) {
      setFirstMount(false);
    } else if (
      currentNode?.data.name.toLowerCase() === "root" ||
      !selectededNodeId
    ) {
    } else {
      openBar("settings");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectededNodeId]);

  return (
    <>
      <Button
        size="sm"
        className={cn(
          "text-base font-bold px-6",
          currentOpenBar === "components" && "opacity-70"
        )}
        onClick={() => toggleBar("components")}
      >
        Add
      </Button>
      <Separator orientation="vertical" />
      <Button
        size="sm"
        className={cn(currentOpenBar === "settings" && "opacity-70")}
        onClick={() => toggleBar("settings")}
      >
        <PencilRulerIcon className="size-5" />
      </Button>
    </>
  );
};
