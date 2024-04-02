"use client";

import { upsertLinkBoxComponent } from "@/actions/admin/footer/upsertLinkBoxComponent";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/useZodForm";
import { linkBoxSchema } from "@/validators/linkBoxSchema";
import { useAction } from "next-safe-action/hooks";
import { useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

type LinkBoxFormProps = {
  id?: string;
  defaultValues?: z.infer<typeof linkBoxSchema>;
};

export const LinkBoxForm: React.FC<LinkBoxFormProps> = ({
  id,
  defaultValues,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const action = useAction(upsertLinkBoxComponent, {
    onSuccess: () => {
      startTransition(() => router.push("/admin/footer"));
    },
  });
  const form = useZodForm({
    schema: linkBoxSchema,
    defaultValues,
  });
  const {
    fields: links,
    append,
    remove,
  } = useFieldArray({
    name: "links",
    control: form.control,
    rules: {
      maxLength: 6,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    action.execute({ ...data, id });
  });

  const isLoading = action.status === "executing" || isPending;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormInput
          control={form.control}
          name="title"
          label="Box title"
          defaultValue=""
          disabled={isLoading}
        />
        <div className="p-2 my-2 flex flex-wrap items-center gap-2">
          <h2 className="w-full text-3xl">Links</h2>
          {links.map((link, i) => (
            <Card key={link.id} className="p-2 relative">
              <FormInput
                control={form.control}
                name={`links.${i}.name`}
                label="Name"
                defaultValue=""
                disabled={isLoading}
              />
              <FormInput
                control={form.control}
                name={`links.${i}.url`}
                label="URL"
                defaultValue=""
                disabled={isLoading}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 rounded-full"
                onClick={() => remove(i)}
                disabled={isLoading}
              >
                <XIcon />
              </Button>
            </Card>
          ))}

          {links.length < 6 && (
            <Button
              type="button"
              onClick={() => append({ name: "", url: "" })}
              disabled={isLoading}
            >
              Add another link
            </Button>
          )}
        </div>
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
