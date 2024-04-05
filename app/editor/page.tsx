"use client";

import { Element } from "@craftjs/core";
import { EditorComponentBar } from "./editor-component-bar";
import { EditorComponentOptionsBar } from "./editor-component-options-bar";
import { EditorProvider, EditorFrameProvider } from "./editor-context";
import { Container } from "./editor-components/container";

export default function EditorPage() {
  return (
    <EditorProvider>
      <div className="w-full flex">
        <EditorComponentBar />
        <EditorFrameProvider>
          <Element data-cy="root" is={Container} canvas />
        </EditorFrameProvider>
        <EditorComponentOptionsBar />
      </div>
    </EditorProvider>
  );
}
