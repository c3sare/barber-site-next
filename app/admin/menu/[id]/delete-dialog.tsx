"use client";
import { deleteMenuItem } from "@/actions/admin/menu/deleteMenuItem";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const DeleteDialog = ({ id }: { id: number }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () =>
    startTransition(async () => {
      const response = await deleteMenuItem(id);

      if (response.data?.success) {
        toast({
          title: "Success",
          description: "Menu item was deleted",
        });
      } else {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Something went wrong",
        });
      }
      setIsOpen(false);
      router.refresh();
    });

  return (
    <AlertDialog open={isOpen || isPending} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2Icon className="size-4 text-slate-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this menu
            item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="bg-red-500 hover:bg-red-400"
            onClick={handleDelete}
          >
            {isPending ? <Loader2 className="animate-spin size-6" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
