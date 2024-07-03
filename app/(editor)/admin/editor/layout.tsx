import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ChevronDownIcon, EllipsisIcon, Layers3Icon, PencilRulerIcon, RotateCcwIcon, RotateCwIcon, SmartphoneIcon } from "lucide-react";
import Link from "next/link";

export default function AdminEditorLayout() {
    return (
        <div className="h-dvh w-full flex flex-col">
            <div className="w-full flex border-b justify-between">
                <div className="flex gap-1 px-1 border-r [&>*]:my-1">
                    <Button size="sm">Add</Button>
                    <Separator orientation="vertical" />
                    <Button size="sm"><PencilRulerIcon className="size-5" /></Button>
                </div>
                <div className="px-1 border-x flex items-center gap-1 [&>*]:my-1">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button size="sm" variant="ghost" className="flex flex-col items-start pr-12 relative">
                                <span className="uppercase font-bold text-xs">EDITING PAGE</span>
                                <span className="text-xs">[Current edited page]</span>
                                <ChevronDownIcon className="absolute right-1 top-1/2 -translate-y-1/2" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>

                        </PopoverContent>
                    </Popover>
                    <Separator orientation="vertical" />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button size="sm" variant="ghost"><SmartphoneIcon /></Button>
                        </PopoverTrigger>
                        <PopoverContent>

                        </PopoverContent>
                    </Popover>
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
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button size="sm" variant="ghost"><EllipsisIcon /></Button>
                        </PopoverTrigger>
                        <PopoverContent>

                        </PopoverContent>
                    </Popover>
                    <Separator orientation="vertical" />
                    <Button size="sm">Save</Button>
                    <Separator orientation="vertical" />
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost"><Cross2Icon /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    You want to exit from editor?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction asChild><Link href="/admin/pages">Exit</Link></AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <div className="w-full flex flex-1">

            </div>
        </div>
    )
}