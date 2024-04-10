"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Button as ButtonShadcn } from "./editor-components/button";
import { EditorComponentDragElement } from "./editor-component-drag-element";
import { Container } from "./editor-components/container";
import { ContainerIcon, TextIcon } from "lucide-react";
import { ThreeRowContainer } from "./editor-components/three-row-container";
import { Text } from "./editor-components/text";

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
        <EditorComponentDragElement
          title="Three Row Container"
          element={<ThreeRowContainer />}
        >
          <ContainerIcon className="size-6" />
        </EditorComponentDragElement>
        <EditorComponentDragElement
          title="Text"
          element={<Text fontSize={24} text={"Text"} />}
        >
          <TextIcon className="size-6" />
        </EditorComponentDragElement>
      </TooltipProvider>
    </div>
  );
};
