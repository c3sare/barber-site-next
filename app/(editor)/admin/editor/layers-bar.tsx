"use client";

import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

import dynamic from "next/dynamic";
import { useEditorState } from "./stores/use-editor-state";
import { useShallow } from "zustand/react/shallow";

const Layers = dynamic(
  () => import("@craftjs/layers").then((mod) => mod.Layers),
  { ssr: false }
);

export const LayersBar = () => {
  const { isOpenLayersBar, toggleLayersBar } = useEditorState(
    useShallow((state) => ({
      isOpenLayersBar: state.isOpenLayersBar,
      toggleLayersBar: state.toggleLayersBar,
    }))
  );

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
