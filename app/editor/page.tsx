import { EditorComponentBar } from "./editor-component-bar";
import { EditorComponentOptionsBar } from "./editor-component-options-bar";
import { EditorProvider, EditorFrameProvider } from "./editor-context";

export default function EditorPage() {
  return (
    <EditorProvider>
      <div className="w-full flex">
        <EditorComponentBar />
        <EditorFrameProvider>
          <div className="flex-1"></div>
        </EditorFrameProvider>
        <EditorComponentOptionsBar />
      </div>
    </EditorProvider>
  );
}
