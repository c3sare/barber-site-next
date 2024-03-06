"use client";

import { userChangePassword } from "@/actions/userChangePassword";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useZodForm } from "@/hooks/useZodForm";
import { userChangePasswordSchema } from "@/validators/userChangePasswordSchema";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

type ChangePasswordFormProps = {
  userId: string;
  token: string;
};

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  userId,
  token,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const action = useAction(userChangePassword, {
    onSettled: (data) => {
      if (data.data?.success) {
        toast({
          title: "Success",
          description: "Your password has been changed",
        });
        router.push("/login");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong",
        });
      }
    },
  });
  const form = useZodForm({
    schema: userChangePasswordSchema,
    defaultValues: {
      userId,
      token,
      password: "",
      repassword: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    action.execute(data);
  });

  const isLoading = action.status === "executing";

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center gap-2"
      >
        <input disabled className="hidden" {...form.register("userId")} />
        <input disabled className="hidden" {...form.register("token")} />
        <FormInput
          control={form.control}
          name="password"
          label="New password"
          type="password"
          disabled={isLoading}
        />
        <FormInput
          control={form.control}
          name="repassword"
          label="Repeat new password"
          type="password"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
