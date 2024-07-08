"use client";

import { TextIcon } from "lucide-react";
import { BuilderElement } from "./builder-element";
import { Text } from "@/app/(site)/admin/pages/editor/editor-components/text";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEditorContext } from "./_ctx/editor-context";
import { createElement } from "react";
import { useEditor } from "@craftjs/core";

export const ComponentBar = () => {
  const {currentOpenBar} = useEditorContext();
  const { selectededNodeId, toolbarSettings } = useEditor((state) => {
    const currentSelectedNodeId = Array.from(state.events.selected).at(0);

    return {
      selectededNodeId: state.events.selected,
      toolbarSettings: currentSelectedNodeId
        ? state.nodes[currentSelectedNodeId]?.related?.toolbar
        : null,
    };
  });

  const isOpenToolbar = selectededNodeId && toolbarSettings;

  if(currentOpenBar === "settings")
  return (
    <div className="w-[300px] p-4 h-full border-r bg-background flex flex-col gap-2">
      {selectededNodeId && toolbarSettings
        ? createElement(toolbarSettings)
        : null}
    </div>
  );

  return (
    currentOpenBar === "components" && <div className="w-[300px] p-4 h-full border-r bg-background">
<Accordion type="multiple" defaultValue={["basic"]}>
  <AccordionItem value="basic">
    <AccordionTrigger>Basic</AccordionTrigger>
    <AccordionContent>
    <BuilderElement element={<Text/>}>
        <TextIcon className="size-5" />
        Text
      </BuilderElement>
    </AccordionContent>
  </AccordionItem>
</Accordion>
    </div>
  );
};
