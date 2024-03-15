"use client";

import { deleteImage } from "@/actions/admin/file-library/deleteImage";
import type { FileLibraryType } from "@/actions/getFilesFromFilesLibrary";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

export const RowActionsDropDown = ({ id }: FileLibraryType) => {
  const router = useRouter();
  const deleteAction = useAction(deleteImage, {
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleDeleteImage = () => {
    deleteAction.execute(id);
  };

  const isLoading = deleteAction.status === "executing";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleDeleteImage} disabled={isLoading}>
          Remove Image
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
