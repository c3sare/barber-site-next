"use client";

import { createPage } from "@/actions/admin/pages/createPage";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useZodForm } from "@/hooks/useZodForm";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { z } from "zod";

export const CreatePageDialogForm = () => {
  const { toast } = useToast();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const action = useAction(createPage, {
    onSettled: () => {
      setIsOpenDialog(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong...",
      });
    },
  });
  const form = useZodForm({
    schema: z.object({
      name: z.string().min(1, "Name is required"),
    }),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    action.execute(data);
  });

  const isLoading = action.status === "executing";

  return (
    <Dialog open={isOpenDialog || isLoading} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button disabled={isLoading}>Create new page</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create new page</DialogTitle>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-2">
            <FormInput
              control={form.control}
              label="Title"
              placeholder="Type a page name..."
              name="name"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="lg"
              className="mx-auto block"
              disabled={isLoading}
            >
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
