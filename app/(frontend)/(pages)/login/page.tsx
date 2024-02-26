"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/useZodForm";
import Link from "next/link";
import { z } from "zod";
import AlternativeLoginOptions from "../(index)/(auth)/_components/AlternativeLoginOptions";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { loginUser } from "@/actions/loginUser";

const SignInPage = () => {
  const action = useAction(loginUser, {
    onError: console.log,
    onSuccess: console.log,
    onSettled: console.log,
    onExecute: console.log,
  });
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const callbackUrl = searchParams.get("callbackUrl") ?? undefined;

  const form = useZodForm({
    schema: z.object({
      email: z.string().email(),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
    }),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    action.execute({ ...data, callbackUrl });
  });

  const isLoading = action.status === "executing";

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center my-16 flex-col">
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex gap-2 flex-col items-center">
          <h1 className="text-4xl after:left-1/2 after:-translate-x-1/2">
            Log In Panel
          </h1>
          <FormInput
            control={form.control}
            name="email"
            className="w-[300px]"
            label="E-mail"
            disabled={isLoading}
          />
          <FormInput
            control={form.control}
            name="password"
            className="w-[300px]"
            label="Password"
            type="password"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            Log in
          </Button>
        </form>
      </Form>
      <AlternativeLoginOptions disabled={isLoading} />
      <span className="text-xs my-4">
        You are new here?{" "}
        <Link className="text-primary hover:underline" href="/register">
          Get started
        </Link>
      </span>
      {!!urlError && (
        <Alert className="max-w-[380px] text-xs" variant="destructive">
          <AlertTriangleIcon />
          <AlertTitle className="font-sans font-normal text-inherit after:content-none before:content-none">
            Login Error
          </AlertTitle>
          <AlertDescription>{urlError}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SignInPage;
