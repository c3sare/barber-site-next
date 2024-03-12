"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/useZodForm";
import Link from "next/link";
import { registerSchema } from "@/validators/registerSchema";
import FormCheckbox from "@/components/form/FormCheckbox";
import { useState, useTransition } from "react";
import AlternativeLoginOptions from "../(index)/(auth)/_components/AlternativeLoginOptions";
import { useAction } from "@/hooks/useAction";
import { registerUser } from "@/actions/registerUser";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function Register() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [usedEmails, setUsedEmails] = useState<string[]>([]);
  const { toast } = useToast();
  const form = useZodForm({
    schema: registerSchema,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      repassword: "",
      terms: false,
    },
  });
  const serverAction = useAction(registerUser, {
    onSuccess: (data) => {
      if (data.type === "success") {
        startTransition(() =>
          router.push(`/verify?email=${form.getValues("email")}`)
        );
        toast({ title: "Success", description: data.message });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message ?? "Something went wrong...",
        });
        if (data.field) {
          if (data.field === "email") {
            setUsedEmails((prev) => [...prev, form.getValues("email")]);
          }

          form.setError(
            data.field,
            { message: data.message },
            { shouldFocus: true }
          );
        }
      }
    },
  });

  const isLoading = serverAction.status === "executing" || isPending;

  const onSubmit = form.handleSubmit(async (data) => {
    if (usedEmails.includes(data.email))
      return form.setError(
        "email",
        { message: "User with this email already exist" },
        { shouldFocus: true }
      );

    if (!executeRecaptcha)
      return toast({ title: "Info", description: "Try again later" });

    const captcha = await executeRecaptcha("submit");
    serverAction.execute({ ...data, captcha });
  });

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center my-16 flex-col">
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex gap-2 flex-col items-center">
          <h1 className="text-4xl after:left-1/2 after:-translate-x-1/2">
            Register
          </h1>
          <FormInput
            control={form.control}
            name="email"
            autoComplete="email"
            className="w-[300px]"
            label="E-mail"
            disabled={isLoading}
          />
          <FormInput
            control={form.control}
            name="name"
            className="w-[300px]"
            label="Name"
            disabled={isLoading}
          />
          <FormInput
            control={form.control}
            name="phone"
            className="w-[300px]"
            label="Phone number"
            disabled={isLoading}
          />
          <FormInput
            control={form.control}
            name="password"
            className="w-[300px]"
            autoComplete="password"
            label="Password"
            type="password"
            disabled={isLoading}
          />
          <FormInput
            control={form.control}
            name="repassword"
            className="w-[300px]"
            autoComplete="re-password"
            label="Repeat Password"
            type="password"
            disabled={isLoading}
          />
          <FormCheckbox
            control={form.control}
            name="terms"
            disabled={isLoading}
            label="Accept terms policy"
            className="w-full"
            description={
              <Link href="/terms" prefetch={false} className="underline">
                Read Terms Policy
              </Link>
            }
          />
          <Button disabled={isLoading} type="submit">
            Register
          </Button>
        </form>
      </Form>
      <AlternativeLoginOptions disabled={isLoading} />
      <span className="text-xs my-4">
        You already have an account?{" "}
        <Link className="text-primary hover:underline" href="/login">
          Log In
        </Link>
      </span>
    </div>
  );
}
