"use client";

import { upsertGalleryBoxComponent } from "@/actions/admin/footer/upsertGalleryBoxComponent";
import { FormInput } from "@/components/form/FormInput";
import FormSelectLibraryImage from "@/components/form/FormSelectLibraryImage";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/useZodForm";
import { galleryComponentSchema } from "@/validators/galleryComponentSchema";
import { XIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useFieldArray } from "react-hook-form";

type GalleryFormProps = {
  id?: string;
  images: {
    id: string;
    url: string;
    name: string;
  }[];
  defaultValues?: {
    images: {
      imageId: string;
    }[];
  };
};

export const GalleryForm: React.FC<GalleryFormProps> = ({
  images,
  defaultValues,
  id,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useZodForm({
    schema: galleryComponentSchema,
    defaultValues,
  });
  const action = useAction(upsertGalleryBoxComponent, {
    onSuccess: () => {
      startTransition(() => router.push("/admin/footer"));
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const onSubmit = form.handleSubmit((data) => {
    action.execute({ id, ...data });
  });

  const isLoading = action.status === "executing" || isPending;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormInput
          control={form.control}
          name="title"
          label="Box title"
          disabled={isLoading}
        />
        <div className="flex flex-wrap">
          {fields.map((item, i) => (
            <div className="relative" key={item.id}>
              <FormSelectLibraryImage
                control={form.control}
                name={`images.${i}.imageId`}
                values={images}
                disabled={isLoading}
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute top-0 text-neutral-400 right-0 p-0 m-0 size-auto"
                onClick={() => remove(i)}
                disabled={isLoading}
              >
                <XIcon />
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          disabled={isLoading}
          onClick={() => append({ imageId: "" })}
        >
          Add new image
        </Button>
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
