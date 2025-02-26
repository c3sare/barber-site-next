"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { format } from "date-fns";
import Image from "next/image";

import { ArrowUpDown } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { FileLibraryType } from "@/actions/admin/file-library/getFilesFromFilesLibrary";
import { RowActionsDropDown } from "./RowActionsDropDown";
import { FilesLibraryProvider } from "../_context/FilesLibraryContext";

type FilesLibraryContextType = {
  deleteFilesFromState: (filesIds: string[]) => void;
  addFilesToState: (files: FileLibraryType[]) => void;
  updateFileInState: (file: FileLibraryType) => void;
};

export const columns = ({
  addFilesToState,
  deleteFilesFromState,
  updateFileInState,
}: FilesLibraryContextType): ColumnDef<FileLibraryType>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "width",
    header: "Width",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "uploadedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Uploaded at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-xs text-nowrap text-center">
        {format(row.getValue("uploadedAt") as Date, "yyyy-MM-dd HH:mm")}
      </div>
    ),
  },
  {
    accessorKey: "desc",
    header: "Description",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "preview",
    header: "Preview",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Image
            className="cursor-pointer aspect-square object-cover transition-[filter] duration-100 blur-xs overflow-hidden"
            src={row.getValue("preview") as string}
            alt={row.getValue("name") as string}
            width={100}
            height={100}
            placeholder="blur"
            blurDataURL={row.original.blurDataUrl}
            onLoad={(e) => e.currentTarget.classList.remove("blur-xs")}
          />
        </DialogTrigger>
        <DialogContent className="max-w-screen-xl w-full max-h-screen">
          <Image
            className="mx-auto max-w-full max-h-full w-auto h-full transition-[filter] duration-100 blur-xs overflow-hidden"
            src={row.getValue("preview")}
            alt={row.getValue("name")}
            width={row.getValue("width")}
            height={row.getValue("height")}
            placeholder="blur"
            blurDataURL={row.original.blurDataUrl}
            onLoad={(e) => e.currentTarget.classList.remove("blur-xs")}
          />
        </DialogContent>
      </Dialog>
    ),
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <FilesLibraryProvider
          addFilesToState={addFilesToState}
          deleteFilesFromState={deleteFilesFromState}
          updateFileInState={updateFileInState}
        >
          <RowActionsDropDown {...row.original} />
        </FilesLibraryProvider>
      );
    },
  },
];
