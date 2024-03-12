"use client";

import { remindPassword } from "@/actions/remindPassword";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/useZodForm";
import { remindPasswordSchema } from "@/validators/remindPasswordSchema";
import { useAction } from "@/hooks/useAction";

export const RemindPasswordForm = () => {
  const action = useAction(remindPassword);
  const form = useZodForm({
    schema: remindPasswordSchema,
  });

  const onSubmit = form.handleSubmit((data) => {
    action.execute(data);
  });

  const isEnd = action.status === "hasSucceeded";

  const isLoading = action.status === "executing";

  if (isEnd)
    return (
      <div className="w-full min-h-[300px] text-center">
        <span>
          If your email was valid, we sent you a message to reset password.
        </span>
      </div>
    );

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col min-h-[300px] items-center justify-center gap-2"
      >
        <FormInput
          disabled={isLoading}
          label="Email"
          control={form.control}
          name="email"
        />
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
