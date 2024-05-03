"use client";

import { deleteFooterComponent } from "@/actions/admin/footer/deleteFooterComponent";
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
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type DeleteDialogProps = {
  children?: React.ReactNode;
  id: number;
};

export const DeleteDialog = ({ children, id }: DeleteDialogProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const action = useAction(deleteFooterComponent, {
    onSettled: () => {
      setOpen(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong...",
      });
    },
    onSuccess: () => router.refresh(),
  });

  const isLoading = action.status === "executing";

  const onClick = () => {
    action.execute(id);
  };

  return (
    <AlertDialog open={open || isLoading} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            component.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={onClick}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
