"use client";

import { Editor, Element, Frame } from "@craftjs/core";
import { EditorComponentBar } from "./editor-component-bar";
import { EditorComponentOptionsBar } from "./editor-component-options-bar";
import { Root } from "./editor-components/root";
import { Button } from "./editor-components/button";
import { Container } from "./editor-components/container";
import { ThreeRowContainer } from "./editor-components/three-row-container";
import { Text } from "./editor-components/text";
import { EditorTopBar } from "./editor-top-bar";
import { useMemo } from "react";
import lz from "lzutf8";
import { RenderNode } from "./render-node";

type Props = {
  content: string;
};
export default function PageEditor({ content = "" }: Props) {
  const data = useMemo(
    () => lz.decompress(lz.decodeBase64(content)),
    [content]
  );

  return (
    <Editor
      resolver={{ Button, Container, Root, ThreeRowContainer, Text }}
      onRender={RenderNode}
    >
      <EditorTopBar />
      <div className="w-full flex">
        <EditorComponentBar />
        <div className="bg-gray-100 w-full max-w-7xl mx-auto my-4">
          <Frame data={data}>
            <Element data-cy="root" is={Root} canvas />
          </Frame>
        </div>
        <EditorComponentOptionsBar />
      </div>
    </Editor>
  );
}
