"use client";

import {
  Columns3Icon,
  HeadingIcon,
  RectangleHorizontalIcon,
  TextIcon,
} from "lucide-react";
import { BuilderElement } from "./builder-element";
import { Text } from "@/app/(editor)/admin/editor/editor-components/text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createElement } from "react";
import { useEditor, Element } from "@craftjs/core";
import { Button } from "@/components/ui/button";
import { Section } from "./editor-components/section";
import { useEditorState } from "./stores/use-editor-state";
import { Columns } from "./editor-components/columns";
import { Heading } from "./editor-components/heading";

export const ComponentBar = () => {
  const { currentOpenBar, openBar } = useEditorState();
  const { selectededNodeId, toolbarSettings } = useEditor((state) => {
    const currentSelectedNodeId = Array.from(state.events.selected).at(0);

    return {
      selectededNodeId: state.events.selected,
      toolbarSettings: currentSelectedNodeId
        ? state.nodes[currentSelectedNodeId]?.related?.toolbar
        : null,
    };
  });

  if (currentOpenBar === "settings")
    return (
      <div className="w-[300px] min-w-[300px] h-full border-r bg-background flex flex-col gap-2 overflow-y-auto">
        {selectededNodeId && toolbarSettings ? (
          createElement(toolbarSettings)
        ) : (
          <div className="w-full h-full flex items-center justify-center flex-col gap-2">
            <span className="text-xs text-gray-500 text-center px-6">
              Add an element to your page or click an existing element to edit
              it.
            </span>
            <Button variant="outline" onClick={() => openBar("components")}>
              Add
            </Button>
          </div>
        )}
      </div>
    );

  return (
    currentOpenBar === "components" && (
      <div className="w-[300px] min-w-[300px] p-4 h-full border-r bg-background">
        <Accordion type="multiple" defaultValue={["basic"]}>
          <AccordionItem value="basic">
            <AccordionTrigger>Basic</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <BuilderElement element={<Element canvas is={Section} />}>
                <RectangleHorizontalIcon className="size-5" />
                Section
              </BuilderElement>
              <BuilderElement element={<Element canvas is={Columns} />}>
                <Columns3Icon className="size-5" />
                Columns
              </BuilderElement>
              <BuilderElement element={<Text />}>
                <TextIcon className="size-5" />
                Text
              </BuilderElement>
              <BuilderElement element={<Heading />}>
                <HeadingIcon className="size-5" />
                Heading
              </BuilderElement>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  );
};
