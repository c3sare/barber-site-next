import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  EllipsisIcon,
  Layers3Icon,
  PencilRulerIcon,
  RotateCcwIcon,
  RotateCwIcon,
} from "lucide-react";
import { DeviceSelect } from "./device-select";
import { getPages } from "@/actions/admin/menu/getPages";
import { PageSelect } from "./page-select";
import { ExitEditorButton } from "./exit-editor-button";
import { Button as ButtonEditor } from "@/app/(site)/admin/pages/editor/editor-components/button";
import { Container } from "@/app/(site)/admin/pages/editor/editor-components/container";
import { ThreeRowContainer } from "@/app/(site)/admin/pages/editor/editor-components/three-row-container";
import { Text } from "@/app/(site)/admin/pages/editor/editor-components/text";
import { Editor } from "@/app/(site)/page/[slug]/editor-lib";
import { RenderNode } from "@/app/(site)/admin/pages/editor/render-node";
import { Root } from "@/app/(site)/admin/pages/editor/editor-components/root";
import Iframe from "./[id]/iframe";

type Props = {
  children?: React.ReactNode;
};

export default async function AdminEditorLayout({ children }: Props) {
  const pages = await getPages();

  return (
    <Editor
      enabled
      resolver={{
        Button: ButtonEditor,
        Container,
        Root,
        ThreeRowContainer,
        Text,
      }}
      onRender={RenderNode}
    >
      <div className="h-dvh w-full flex flex-col">
        <div className="w-full flex border-b justify-between">
          <div className="flex gap-1 px-1 border-r [&>button]:my-1">
            <Button size="sm">Add</Button>
            <Separator orientation="vertical" />
            <Button size="sm">
              <PencilRulerIcon className="size-5" />
            </Button>
          </div>
          <div className="px-1 border-x flex items-center gap-1 [&>*]:my-1">
            <PageSelect pages={pages} />
            <Separator orientation="vertical" />
            <DeviceSelect />
          </div>
          <div className="flex gap-1 px-1 border-l items-center">
            <Button size="sm" variant="ghost">
              <RotateCcwIcon />
            </Button>
            <Button size="sm" variant="ghost">
              <RotateCwIcon />
            </Button>
            <Separator orientation="vertical" />
            <Button size="sm" variant="ghost">
              <Layers3Icon />
            </Button>
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
            <Button size="sm">Save</Button>
            <Separator orientation="vertical" />
            <ExitEditorButton />
          </div>
        </div>
        <div className="w-full flex flex-1">
          <Iframe className="w-full">{children}</Iframe>
        </div>
      </div>
    </Editor>
  );
}
