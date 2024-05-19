"use client";

import { FormInput } from "@/components/form/FormInput";
import { useZodForm } from "@/hooks/useZodForm";
import { FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { addMenu } from "@/actions/admin/menu/addMenu";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const MenuForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useZodForm({
    schema: z.object({
      title: z
        .string()
        .min(1, "Title is required")
        .max(255, "Title is too long"),
    }),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = form.handleSubmit((data) =>
    startTransition(async () => {
      const { data: result } = await addMenu(data.title);

      setDialogOpen(false);

      if (result?.success)
        toast({
          title: "Success",
          description: "Menu was added",
        });
      else
        toast({
          title: "Error",
          variant: "destructive",
          description: "Something went wrong",
        });

      router.refresh();
    })
  );

  return (
    <Dialog open={dialogOpen || isPending} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add new menu</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New menu</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="space-y-2">
            <FormInput
              disabled={isPending}
              control={form.control}
              name="title"
              label="Title"
            />
            <Button
              className="mx-auto block"
              disabled={isPending}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
