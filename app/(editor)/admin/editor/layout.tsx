import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  ChevronDownIcon,
  EllipsisIcon,
  Layers3Icon,
  PencilRulerIcon,
  RotateCcwIcon,
  RotateCwIcon,
} from "lucide-react";
import Link from "next/link";
import { DeviceSelect } from "./device-select";
import { getPages } from "@/actions/admin/menu/getPages";
import { PageSelect } from "./page-select";
import { ExitEditorButton } from "./exit-editor-button";

export default async function AdminEditorLayout() {
  const pages = await getPages();

  return (
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
      <div className="w-full flex flex-1"></div>
    </div>
  );
}
