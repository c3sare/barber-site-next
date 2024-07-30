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
import { ComponentBar } from "./component-bar";
import { EditorContextProvider } from "./_ctx/editor-context";
import { BarButtons } from "./bar-buttons";
import { UndoRedoButtons } from "./undo-redo-buttons";
import { LayersBar } from "./layers-bar";
import { LayersButton } from "./layers-button";
import { SavePageButton } from "./save-page-button";
import dynamic from "next/dynamic";
import { getFonts } from "@/actions/getFonts";
import { FontsContextProvider } from "./_ctx/fonts-context";
import { FrameDeviceSizeContextProvider } from "./_ctx/frame-device-size-context";
import { IsResizingContextProvider } from "./_ctx/is-resizing-context";

const EditorWrapper = dynamic(() => import("./editor-wrapper"), { ssr: false });

type Props = {
  children?: React.ReactNode;
};

export default async function AdminEditorLayout({ children }: Props) {
  const pages = await getPages();
  const fonts = await getFonts();

  return (
    <IsResizingContextProvider>
      <FrameDeviceSizeContextProvider>
        <FontsContextProvider fonts={fonts}>
          <EditorContextProvider>
            <EditorWrapper>
              <div className="h-dvh w-full flex overflow-hidden flex-col">
                <div className="w-full flex border-b justify-between h-[45px]">
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
                <div className="w-full flex flex-1 bg-neutral-100 relative h-[calc(100%_-_45px)]">
                  <ComponentBar />
                  {children}
                  <LayersBar />
                </div>
              </div>
            </EditorWrapper>
          </EditorContextProvider>
        </FontsContextProvider>
      </FrameDeviceSizeContextProvider>
    </IsResizingContextProvider>
  );
}
