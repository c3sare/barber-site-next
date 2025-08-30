"use client";

import FormSelectLibraryImage from "@/components/form/FormSelectLibraryImage";
import FormTextarea from "@/components/form/FormTextarea";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/components/ui/button";
import { heroComponentSchema } from "@/validators/heroComponentSchema";
import { useAction } from "next-safe-action/hooks";
import { upsertHeroBoxComponent } from "@/actions/admin/footer/upsertHeroBoxComponent";
import * as z from "zod/mini";
import { useState, useTransition } from "react";
import { FormInput } from "@/components/form/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type HeroFormProps = {
  images: { id: string; url: string; name: string }[];
  id?: number;
  defaultValues?: z.infer<typeof heroComponentSchema>;
};

export const HeroForm: React.FC<HeroFormProps> = ({
  images,
  id,
  defaultValues,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isActiveButton, setIsActiveButton] = useState<boolean>(
    !!defaultValues?.button
  );
  const action = useAction(upsertHeroBoxComponent, {
    onSuccess: () => {
      startTransition(() => router.push("/admin/footer"));
    },
  });
  const form = useZodForm({ schema: heroComponentSchema, defaultValues });

  const onSubmit = form.handleSubmit((data) => {
    action.execute({ ...data, id });
  });

  const isLoading = action.status === "executing" || isPending;

  return (
    <Form {...form}>
      <form className="" onSubmit={onSubmit}>
        <FormTextarea
          disabled={isLoading}
          label="Text"
          control={form.control}
          name="text"
        />
        <FormSelectLibraryImage
          control={form.control}
          label="Image"
          name="image"
          values={images}
          disabled={isLoading}
        />
        <div className="flex items-center space-x-2 my-4">
          <Checkbox
            id="button-active"
            checked={isActiveButton}
            disabled={isLoading}
            onCheckedChange={(value) => setIsActiveButton(!!value)}
          />
          <Label htmlFor="button-active">Show link button</Label>
        </div>
        {isActiveButton && (
          <div className="my-2">
            <FormInput
              name={`button.text`}
              label="Button text"
              control={form.control}
              disabled={isLoading}
            />
            <FormInput
              name={`button.url`}
              label="Button link"
              control={form.control}
              disabled={isLoading}
            />
          </div>
        )}
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
