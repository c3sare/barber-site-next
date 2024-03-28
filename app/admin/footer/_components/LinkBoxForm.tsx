"use client";

import { addLinkBoxComponent } from "@/actions/admin/footer/addLinkBoxComponent";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/useZodForm";
import { linkBoxSchema } from "@/validators/linkBoxSchema";
import { useAction } from "next-safe-action/hooks";
import { useFieldArray } from "react-hook-form";
import { z } from "zod";

type LinkBoxFormProps = {
  id?: string;
  defaultValues?: z.infer<typeof linkBoxSchema>;
};

export const LinkBoxForm: React.FC<LinkBoxFormProps> = ({
  id,
  defaultValues,
}) => {
  const action = useAction(addLinkBoxComponent);
  const form = useZodForm({
    schema: linkBoxSchema,
    defaultValues,
  });
  const { fields: links, append } = useFieldArray({
    name: "links",
    control: form.control,
  });

  const onSubmit = form.handleSubmit((data) => {
    action.execute({ ...data, id });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormInput control={form.control} name="title" label="Box title" />
        <div className="p-2 my-2 flex flex-wrap items-center gap-2">
          <h2 className="w-full text-3xl">Links</h2>
          {links.map((link, i) => (
            <div key={link.id} className="p-2">
              <FormInput
                control={form.control}
                name={`links.${i}.name`}
                label="Name"
              />
              <FormInput
                control={form.control}
                name={`links.${i}.url`}
                label="URL"
              />
            </div>
          ))}
          <Button
            type="button"
            className="mx-auto"
            onClick={() => append({ name: "", url: "" })}
          >
            Add another link
          </Button>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
