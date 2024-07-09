"use client";

import { Button } from "@/components/ui/button";
import { useEditor } from "@craftjs/core";
import { RotateCcwIcon, RotateCwIcon } from "lucide-react";

export const UndoRedoButtons = () => {
  const { actions, canRedo, canUndo } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        disabled={!canUndo}
        onClick={actions.history.undo}
      >
        <RotateCcwIcon />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        disabled={!canRedo}
        onClick={actions.history.redo}
      >
        <RotateCwIcon />
      </Button>
    </>
  );
};
