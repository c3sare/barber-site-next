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
import { FileDeleteAlertDialog } from "./FileDeleteAlertDialog";
import { useState } from "react";

export const RowActionsDropDown = ({ id }: FileLibraryType) => {
  const router = useRouter();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
  const deleteAction = useAction(deleteImage, {
    onSettled: () => {
      setIsOpenDeleteDialog(false);
    },
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
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setIsOpenDeleteDialog(true)}>
          Remove Image
        </DropdownMenuItem>
      </DropdownMenuContent>
      <FileDeleteAlertDialog
        open={isOpenDeleteDialog}
        onOpenChange={setIsOpenDeleteDialog}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permamently delete file."
        onClick={handleDeleteImage}
        disabled={isLoading}
      />
    </DropdownMenu>
  );
};
