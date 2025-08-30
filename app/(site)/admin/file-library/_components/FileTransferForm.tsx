"use client";

import { uploadImages } from "@/actions/admin/file-library/uploadImages";
import { FileUploadArea } from "@/components/FileUploadArea";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useZodForm } from "@/hooks/useZodForm";
import { fileSchema } from "@/validators/fileSchema";
import { useAction } from "next-safe-action/hooks";
import * as z from "zod/mini";
import { useFilesLibraryContext } from "../_context/FilesLibraryContext";

type FileTransferFormProps = { closeForm: () => void };

export const FileTransferForm = ({ closeForm }: FileTransferFormProps) => {
  const { addFilesToState } = useFilesLibraryContext();
  const { toast } = useToast();
  const form = useZodForm({
    schema: z.object({
      files: z.array(z.object({ id: z.string(), file: fileSchema })),
    }),
  });
  const action = useAction(uploadImages, {
    onSuccess: (data) => {
      addFilesToState(data?.data ?? []);
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
