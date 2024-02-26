"use client";

import { updateUserPassword } from "@/actions/updateUserPassword";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useZodForm } from "@/hooks/useZodForm";
import { changePasswordSchema } from "@/validators/changePasswordSchema";
import { useAction } from "next-safe-action/hooks";

const ChangePasswordForm = () => {
  const { toast } = useToast();
  const user = useCurrentUser();

  const action = useAction(updateUserPassword, {
    onSettled: (data) => {
      form.reset();
      if (data.data?.success) {
        toast({
          title: "Success",
          description: "Password was updated",
        });
      } else {
        toast({
          title: "Error",
          description: data.data?.message
            ? data.data.message
            : "Something went wrong",
        });
      }
    },
  });

  const isLoading = action.status === "executing";
  const form = useZodForm({
    schema: changePasswordSchema,
    disabled: user?.isOAuth || isLoading,
    defaultValues: {
      password: "",
      newPassword: "",
      reNewPassword: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    action.execute(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="max-w-sm mx-auto">
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
          disabled={form.formState.disabled || isLoading}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
