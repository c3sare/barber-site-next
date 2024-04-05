"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Button as ButtonShadcn } from "./editor-components/button";
import { EditorComponentDragElement } from "./editor-component-drag-element";
import { Container } from "./editor-components/container";
import { ContainerIcon } from "lucide-react";

export const EditorComponentBar = () => {
  return (
    <div className="w-20 h-screen border-r flex flex-col items-center py-4">
      <TooltipProvider>
        <EditorComponentDragElement
          title="Button"
          element={<ButtonShadcn text="text" />}
        >
          <ButtonIcon className="size-6" />
        </EditorComponentDragElement>
        <EditorComponentDragElement title="Container" element={<Container />}>
          <ContainerIcon className="size-6" />
        </EditorComponentDragElement>
      </TooltipProvider>
    </div>
  );
};
