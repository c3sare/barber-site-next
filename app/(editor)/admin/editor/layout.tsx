import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { EllipsisIcon } from "lucide-react";
import { DeviceSelect } from "./device-select";
import { getPages } from "@/actions/admin/menu/getPages";
import { PageSelect } from "./page-select";
import { ExitEditorButton } from "./exit-editor-button";
import { Button as ButtonEditor } from "@/app/(editor)/admin/editor/editor-components/button";
import { Container } from "@/app/(editor)/admin/editor/editor-components/container";
import { ThreeRowContainer } from "@/app/(editor)/admin/editor/editor-components/three-row-container";
import { Text } from "@/app/(editor)/admin/editor/editor-components/text";
import { Editor } from "@/app/(site)/page/[slug]/editor-lib";
import { RenderNode } from "@/app/(editor)/admin/editor/render-node";
import { Root } from "@/app/(editor)/admin/editor/editor-components/root";
import { ComponentBar } from "./component-bar";
import { EditorContextProvider } from "./_ctx/editor-context";
import { BarButtons } from "./bar-buttons";
import { UndoRedoButtons } from "./undo-redo-buttons";
import { LayersBar } from "./layers-bar";
import { LayersButton } from "./layers-button";
import { SavePageButton } from "./save-page-button";
import { Column } from "./editor-components/new/column";
import { Section } from "./editor-components/new/section";

type Props = {
  children?: React.ReactNode;
};

export default async function AdminEditorLayout({ children }: Props) {
  const pages = await getPages();

  return (
    <EditorContextProvider>
      <Editor
        enabled
        resolver={{
          Section,
          Column,
          Button: ButtonEditor,
          Container,
          Root,
          ThreeRowContainer,
          Text,
        }}
        onRender={RenderNode}
      >
        <div className="h-dvh w-full flex overflow-hidden flex-col">
          <div className="w-full flex border-b justify-between">
            <div className="flex gap-1 px-1 border-r [&>button]:my-1">
              <BarButtons />
            </div>
            <div className="px-1 border-x flex items-center gap-1 [&>*]:my-1">
              <PageSelect pages={pages} />
              <Separator orientation="vertical" />
              <DeviceSelect />
            </div>
            <div className="flex gap-1 px-1 border-l items-center">
              <UndoRedoButtons />
              <Separator orientation="vertical" />
              <LayersButton />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost">
                    <EllipsisIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Global Settings</DropdownMenuItem>
                  <DropdownMenuItem>Selectors</DropdownMenuItem>
                  <DropdownMenuItem>History</DropdownMenuItem>
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Separator orientation="vertical" />
              <SavePageButton />
              <Separator orientation="vertical" />
              <ExitEditorButton />
            </div>
          </div>
          <div className="w-full flex flex-1 bg-neutral-100 relative">
            <ComponentBar />
            {children}
            <LayersBar />
          </div>
        </div>
      </Editor>
    </EditorContextProvider>
  );
}
