"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { FileDeleteAlertDialog } from "./FileDeleteAlertDialog";
import { useAction } from "next-safe-action/hooks";
import { deleteImage } from "@/actions/admin/file-library/deleteImage";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type MultiActionsDropDownProps<TData> = {
  table: Table<TData>;
  deleteFilesFromState: (filesIds: string[]) => void;
};

export const MultiActionsDropDown = <TData extends unknown>({
  table,
  deleteFilesFromState,
}: MultiActionsDropDownProps<TData>) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isVisibleDeleteDialog, setIsVisibleDeleteDialog] =
    useState<boolean>(false);
  const deleteAction = useAction(deleteImage, {
    onSettled: () => {
      setIsVisibleDeleteDialog(false);
      table.setState((state) => ({ ...state, rowSelection: {} }));
    },
    onError: () => {
      router.refresh();
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong...",
      });
    },
    onSuccess: (_, fileIds) => {
      const ids = typeof fileIds === "string" ? [fileIds] : fileIds;

      deleteFilesFromState(ids);
    },
  });

  const selectedFilesIds = table
    .getFilteredSelectedRowModel()
    .flatRows.map((item) => item.getValue("id") as string);

  const handleDeleteSelectedFiles = () =>
    deleteAction.execute(selectedFilesIds);

  const isDeletingFiles = deleteAction.status === "executing";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          disabled={!table.getFilteredSelectedRowModel().rows.length}
        >
          <Button>Multi Action</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsVisibleDeleteDialog(true)}>
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <FileDeleteAlertDialog
        open={isVisibleDeleteDialog}
        onOpenChange={setIsVisibleDeleteDialog}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete selected files."
        disabled={isDeletingFiles}
        onClick={handleDeleteSelectedFiles}
      />
    </>
  );
};
