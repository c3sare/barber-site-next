"use client";

import { Button } from "@/app/editor/editor-components/button";
import { Container } from "@/app/editor/editor-components/container";
import { Root } from "@/app/editor/editor-components/root";
import { Text } from "@/app/editor/editor-components/text";
import { ThreeRowContainer } from "@/app/editor/editor-components/three-row-container";
import { Editor, Frame } from "@craftjs/core";

type Props = {
  content: string;
};

export default function PageRender({ content }: Props) {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <Editor
        enabled={false}
        resolver={{ Button, Container, ThreeRowContainer, Root, Text }}
      >
        <Frame json={content} />
      </Editor>
    </div>
  );
}
