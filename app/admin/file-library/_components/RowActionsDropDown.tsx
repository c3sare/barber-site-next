"use client";

import { deleteImage } from "@/actions/admin/file-library/deleteImage";
import type { FileLibraryType } from "@/actions/admin/file-library/getFilesFromFilesLibrary";
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
import { FileDeleteAlertDialog } from "./FileDeleteAlertDialog";
import { useState } from "react";
import { useFilesLibraryContext } from "../_context/FilesLibraryContext";
import { FileEditDialog } from "./FileEditDialog";

export const RowActionsDropDown = (file: FileLibraryType) => {
  const { deleteFilesFromState } = useFilesLibraryContext();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState<boolean>(false);
  const deleteAction = useAction(deleteImage, {
    onSettled: () => {
      setIsOpenDeleteDialog(false);
    },
    onSuccess: ({ input: id }) => {
      deleteFilesFromState(typeof id === "string" ? [id] : id);
    },
  });

  const handleDeleteImage = () => {
    deleteAction.execute(file.id);
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
        <DropdownMenuItem onClick={() => setIsOpenEditDialog(true)}>
          Edit
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
      <FileEditDialog
        open={isOpenEditDialog}
        onOpenChange={setIsOpenEditDialog}
        file={file}
      />
    </DropdownMenu>
  );
};
