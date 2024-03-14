"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { format } from "date-fns";
import Image from "next/image";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { FileLibraryType } from "@/actions/getFilesFromFilesLibrary";

export const columns: ColumnDef<FileLibraryType>[] = [
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
    accessorKey: "id",
    header: "ID",
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
            className="cursor-pointer aspect-square object-cover transition-[filter] duration-100 blur-sm overflow-hidden"
            src={row.getValue("preview") as string}
            alt={row.getValue("name") as string}
            width={100}
            height={100}
            placeholder="blur"
            blurDataURL={row.original.blurDataUrl}
            onLoad={(e) => e.currentTarget.classList.remove("blur-sm")}
          />
        </DialogTrigger>
        <DialogContent className="max-w-screen-xl">
          <Image
            className="mx-auto max-w-screen-lg transition-[filter] duration-100 blur-sm overflow-hidden"
            src={row.getValue("preview")}
            alt={row.getValue("name")}
            width={row.getValue("width")}
            height={row.getValue("height")}
            placeholder="blur"
            blurDataURL={row.original.blurDataUrl}
            onLoad={(e) => e.currentTarget.classList.remove("blur-sm")}
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Remove Image</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
