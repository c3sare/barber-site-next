"use client";

import { verifyEmail } from "@/actions/verifyEmail";
import { Form } from "@/components/ui/form";
import { FakeDash, Slot } from "@/components/ui/passcode-input";
import { useToast } from "@/components/ui/use-toast";
import { useZodForm } from "@/hooks/useZodForm";
import { passcodeVerifySchema } from "@/validators/passcodeVerifySchema";
import { OTPInput } from "input-otp";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ResendButtonPasscode } from "./ResendPasscodeButton";

export const PasscodeForm = ({ email }: { email: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useZodForm({
    schema: passcodeVerifySchema,
    defaultValues: {
      email,
      passcode: "",
    },
  });
  const action = useAction(verifyEmail, {
    onSettled: (data) => {
      if (data.data?.success) {
        toast({
          title: "Success",
          description: "Your email has been verified successfully",
        });
        router.push("/login");
      } else {
        form.setValue("passcode", "");
        toast({
          variant: "destructive",
          title: "Error",
          description: data.data?.message ?? "Something went wrong",
        });
      }
    },
  });

  const isLoading = action.status === "executing";
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    form.setFocus("passcode");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = form.handleSubmit((data) => action.execute(data));

  const passcodeRegisterReturn = form.register("passcode");

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="w-full gap-4 min-h-[500px] flex flex-col items-center justify-center"
      >
        <span className="font-bold text-xl text-center">
          Enter passcode from your email to verify account
        </span>
        <input disabled className="hidden" {...form.register("email")} />
        <OTPInput
          disabled={isLoading}
          maxLength={6}
          minLength={6}
          containerClassName="group flex items-center has-[:disabled]:opacity-30"
          render={({ slots }) => (
            <>
              <div className="flex">
                {slots.slice(0, 3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>

              <FakeDash />

              <div className="flex">
                {slots.slice(3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
            </>
          )}
          {...passcodeRegisterReturn}
          onChange={(value) => {
            form.setValue("passcode", value);
            if (value.length === 6) {
              submitButtonRef.current?.click();
            }
          }}
        />
        <button
          ref={submitButtonRef}
          disabled={isLoading}
          className="hidden"
          type="submit"
        />
        <ResendButtonPasscode email={email} />
      </form>
    </Form>
  );
};
