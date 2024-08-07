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
import { loginUser } from "@/actions/loginUser";
import { useToast } from "@/components/ui/use-toast";
import { useState, useTransition } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Typography } from "@/components/typography";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [usedNotExistEmails, setUsedNotExistEmails] = useState<string[]>([]);
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

  const { toast } = useToast();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const callbackUrl = searchParams.get("callbackUrl") ?? undefined;

  const onSubmit = form.handleSubmit((data) => {
    async function transition() {
      if (usedNotExistEmails.includes(data.email)) {
        form.setError(
          "email",
          { message: "User with this email don't exist" },
          { shouldFocus: true }
        );
        return;
      }

      if (!executeRecaptcha) {
        toast({ title: "Information", description: "Try again." });
        return;
      }

      const token = await executeRecaptcha("submit");

      const loginData = await loginUser({
        ...data,
        callbackUrl,
        token,
      });

      if (loginData?.data?.type === "error") {
        const { message } = loginData.data;

        if (loginData.data?.field) {
          const { field } = loginData.data;
          if (field === "email")
            setUsedNotExistEmails((prev) => [...prev, form.getValues("email")]);

          form.setError(field, { message }, { shouldFocus: true });
        } else
          toast({
            variant: "destructive",
            title: "Error",
            description: message,
          });
      }
    }
    startTransition(() => transition());
  });

  return (
    <div className="max-w-[300px] mx-auto flex items-center justify-center my-16 flex-col">
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="flex gap-2 flex-col items-center w-full px-4"
        >
          <Typography
            tag="h1"
            className="text-4xl after:left-1/2 after:-translate-x-1/2"
          >
            Log In Panel
          </Typography>
          <FormInput
            control={form.control}
            name="email"
            className="w-full"
            label="E-mail"
            disabled={isPending}
          />
          <FormInput
            control={form.control}
            name="password"
            className="w-full"
            label="Password"
            type="password"
            disabled={isPending}
          />
          <Button type="submit" disabled={isPending}>
            Log in
          </Button>
        </form>
      </Form>
      <AlternativeLoginOptions
        startTransition={startTransition}
        disabled={isPending}
        callbackUrl={callbackUrl}
      />
      <span className="text-xs my-4 px-4">
        You are new here?{" "}
        <Link className="text-primary hover:underline" href="/register">
          Get started
        </Link>
      </span>
      <span className="text-xs mb-4 px-4">
        Forgot your password?{" "}
        <Link className="text-primary hover:underline" href="/remind">
          Send a reminder
        </Link>
      </span>
      {!!urlError && (
        <Alert className="w-full max-w-[380px] text-xs" variant="destructive">
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
