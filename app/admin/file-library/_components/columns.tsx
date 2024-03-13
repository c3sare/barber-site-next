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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type File = {
  id: string;
  name: string;
  extension: string;
  type: "IMAGE" | "AUDIO" | "VIDEO" | "DOCUMENT" | "SPREADSHEET" | "ARCHIEVE";
  width: number;
  height: number;
  uploadedAt: Date;
  preview: string;
  desc: string;
  author: string;
};

export const columns: ColumnDef<File>[] = [
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
    accessorKey: "extension",
    header: "Ext",
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
      <Image
        src={row.getValue("preview") as string}
        alt={row.getValue("name") as string}
        width={100}
        height={100}
      />
    ),
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
