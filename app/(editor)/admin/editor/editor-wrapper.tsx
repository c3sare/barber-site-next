"use client";

import { Editor } from "@craftjs/core";
import { Section } from "./editor-components/section";
import { Column } from "./editor-components/columns";
import { Root } from "./editor-components/root";
import { Text } from "./editor-components/text";
import { RenderNode } from "./render-node";

export default function EditorWrapper({ children }: React.PropsWithChildren) {
  return (
    <Editor
      enabled
      resolver={{
        Section,
        Column,
        Root,
        Text,
      }}
      onRender={RenderNode}
    >
      {children}
    </Editor>
  );
}
