"use client";

import { updateImage } from "@/actions/admin/file-library/updateImage";
import { FormInput } from "@/components/form/FormInput";
import FormTextarea from "@/components/form/FormTextarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/useZodForm";
import { editImageSchema } from "@/validators/editImageSchema";
import { useAction } from "next-safe-action/hooks";
import { useFilesLibraryContext } from "../_context/FilesLibraryContext";
import { FileLibraryType } from "@/actions/admin/file-library/getFilesFromFilesLibrary";
import { useToast } from "@/components/ui/use-toast";
import * as z from "zod/mini";

type FileEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: FileLibraryType;
};

export const FileEditDialog: React.FC<FileEditDialogProps> = ({
  open,
  onOpenChange,
  file,
}) => {
  const { toast } = useToast();
  const { updateFileInState } = useFilesLibraryContext();
  const { status, execute } = useAction(updateImage, {
    onSuccess: ({ data }) => {
      if (data) {
        updateFileInState(data);
      }
      onOpenChange(false);
    },
    onError: () => {
      onOpenChange(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong...",
      });
    },
  });
  const form = useZodForm({
    schema: z.omit(editImageSchema, { id: true }),
    defaultValues: { name: file.name, description: file.desc },
  });

  const onSubmit = form.handleSubmit((data) => {
    execute({ id: file.id, ...data });
  });

  const isLoading = status === "executing";

  return (
    <Dialog open={open || isLoading} onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <FormInput
              control={form.control}
              name="name"
              label="Name"
              disabled={isLoading}
            />
            <FormTextarea
              control={form.control}
              name="description"
              label="Description"
              disabled={isLoading}
            />
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
