"use client";

import { Editor } from "@craftjs/core";
import { Section } from "./editor-components/new/section";
import { Column } from "./editor-components/new/column";
import { Container } from "./editor-components/container";
import { Root } from "./editor-components/root";
import { ThreeRowContainer } from "./editor-components/three-row-container";
import { Text } from "./editor-components/text";
import { Button } from "./editor-components/button";
import { RenderNode } from "./render-node";

export default function EditorWrapper({ children }: React.PropsWithChildren) {
  return (
    <Editor
      enabled
      resolver={{
        Section,
        Column,
        Button,
        Container,
        Root,
        ThreeRowContainer,
        Text,
      }}
      onRender={RenderNode}
    >
      {children}
    </Editor>
  );
}
