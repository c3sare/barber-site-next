"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useZodForm } from "@/hooks/useZodForm";
import { changePasswordSchema } from "@/validators/changePasswordSchema";

const ChangePasswordForm = () => {
  const user = useCurrentUser();
  const form = useZodForm({
    schema: changePasswordSchema,
    disabled: user?.isOAuth,
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormInput
          control={form.control}
          name="password"
          label="Current Password"
          type="password"
        />
        <FormInput
          control={form.control}
          name="newPassword"
          label="New Password"
          type="password"
        />
        <FormInput
          control={form.control}
          name="reNewPassword"
          label="Repeat New Password"
          type="password"
        />
        <Button
          className="my-2"
          disabled={form.formState.disabled}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
