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
  const { fields: links } = useFieldArray({
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
        <div>
          {links.map((link, i) => (
            <div key={id}>
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
        </div>
        <Button>Submit</Button>
      </form>
    </Form>
  );
};
