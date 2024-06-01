"use client";

import { SquareCheckBigIcon } from "lucide-react";
import { MenuOptionButton } from "./menu-option-button";
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
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { setHeaderMenu } from "@/actions/admin/menu/setHeaderMenu";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  menuId: number;
};

export const SetHeaderMenuButton = ({ menuId }: Props) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSetHeaderMenu = () =>
    startTransition(async () => {
      const response = await setHeaderMenu(menuId);

      if (!response.data?.success)
        toast({
          title: "Error",
          variant: "destructive",
          description: "Something went wrong",
        });

      router.refresh();
    });

  return (
    <AlertDialog open={isOpen || isPending} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <MenuOptionButton tooltip="Set as Header Menu">
          <SquareCheckBigIcon />
        </MenuOptionButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will set selected menu as header menu.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleSetHeaderMenu}>
            Set Header Menu
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
