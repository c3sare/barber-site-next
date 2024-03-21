"use client";

import { uploadImages } from "@/actions/uploadImages";
import { FileUploadArea } from "@/components/FileUploadArea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useZodForm } from "@/hooks/useZodForm";
import { fileSchema } from "@/validators/fileSchema";
import { useAction } from "next-safe-action/hooks";
import { z } from "zod";

type FileTransferFormProps<TData> = {
  addFilesToState: (files: TData[]) => void;
  closeForm: () => void;
};

export const FileTransferForm = <T extends unknown>({
  addFilesToState,
  closeForm,
}: FileTransferFormProps<T>) => {
  const { toast } = useToast();
  const form = useZodForm({
    schema: z.object({
      files: z
        .object({
          id: z.string(),
          file: fileSchema,
        })
        .array(),
    }),
  });
  const action = useAction(uploadImages, {
    onSuccess: (data) => {
      addFilesToState(data as T[]);
      closeForm();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong...",
      });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    if (data.files) {
      const fd = new FormData();
      for (const file of data.files) {
        fd.append(file.id, file.file);
      }

      action.execute(fd);
    }
  });

  const isLoading = action.status === "executing";

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center gap-2"
      >
        <FileUploadArea
          disabled={isLoading}
          control={form.control}
          name="files"
        />
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
