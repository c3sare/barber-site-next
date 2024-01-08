"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/useZodForm";
import { profileInformationsSchema } from "@/validators/profileInformationsSchema";
import { getProfileInformation } from "../../_actions/getProfileInformation";

const ProfileInformationsForm = () => {
  const form = useZodForm({
    schema: profileInformationsSchema,
    defaultValues: async () => {
      const data = await getProfileInformation();
      return data;
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center items-center gap-2"
      >
        <FormInput control={form.control} name="name" label="Name" />
        <FormInput control={form.control} name="phone" label="Phone" />
        <FormInput control={form.control} name="email" label="E-mail" />
        <Button disabled={form.formState.disabled} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ProfileInformationsForm;
