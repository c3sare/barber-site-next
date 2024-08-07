"use client";

import { Editor } from "@craftjs/core";
import { Section } from "./editor-components/section";
import { Column } from "./editor-components/column";
import { Root } from "./editor-components/root";
import { Text } from "./editor-components/text";
import { RenderNode } from "./render-node";
import { Columns } from "./editor-components/columns";
import { Heading } from "./editor-components/heading";

export default function EditorWrapper({ children }: React.PropsWithChildren) {
  return (
    <Editor
      enabled
      resolver={{
        Section,
        Column,
        Root,
        Text,
        Columns,
        Heading,
      }}
      onRender={RenderNode}
    >
      {children}
    </Editor>
  );
}
