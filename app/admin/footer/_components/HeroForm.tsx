"use client";

import FormSelectLibraryImage from "@/components/form/FormSelectLibraryImage";
import FormTextarea from "@/components/form/FormTextarea";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";
import { Button } from "@/components/ui/button";

type HeroFormProps = {
  images: {
    id: string;
    url: string;
    name: string;
  }[];
  id?: string;
  defaultValues?: {
    image: string;
    text: string;
    button?: {
      text: string;
      link: {
        type: "internal" | "external";
        url: string;
      };
    };
  };
};

export const HeroForm: React.FC<HeroFormProps> = ({
  images,
  id,
  defaultValues,
}) => {
  const form = useZodForm({
    schema: z.object({
      image: z.string(),
      text: z.string(),
      button: z.optional(
        z.object({
          text: z.string(),
          link: z.object({
            type: z.enum(["internal", "external"]),
            url: z.string(),
          }),
        })
      ),
    }),
    defaultValues,
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form className="" onSubmit={onSubmit}>
        <FormTextarea label="Text" control={form.control} name="text" />
        <FormSelectLibraryImage
          control={form.control}
          label="Image"
          name="image"
          values={images}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
