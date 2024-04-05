"use client";

import { deletePage } from "@/actions/admin/pages/deletePage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  id: string;
};

export const DeletePageDialog = ({ children, id }: Props) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const action = useAction(deletePage, {
    onSuccess: () => {
      setIsOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Something went wrong...",
      });
    },
  });

  const disabled = action.status === "executing";

  const isOpenDialog = isOpen || disabled;

  return (
    <AlertDialog open={isOpenDialog} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>Are you sure?</AlertDialogHeader>
        <AlertDialogDescription>
          This action cannot be undone. Are you sure you want to delete this
          page?
        </AlertDialogDescription>
        <Button
          variant="destructive"
          disabled={disabled}
          onClick={() => action.execute(id)}
        >
          Delete page
        </Button>
        <AlertDialogCancel disabled={disabled}>Cancel</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
