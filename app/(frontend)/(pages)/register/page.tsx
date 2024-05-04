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

  const onSubmit = form.handleSubmit((data) => {
    async function transition() {
      if (usedEmails.includes(data.email)) {
        form.setError(
          "email",
          { message: "User with this email already exist" },
          { shouldFocus: true }
        );
        return;
      }

      if (!executeRecaptcha) {
        toast({ title: "Info", description: "Try again later" });
        return;
      }

      const captcha = await executeRecaptcha("submit");
      const { data: registerData } = await registerUser({ ...data, captcha });

      if (registerData?.type === "success") {
        startTransition(() => router.push(`/verify?email=${data.email}`));
        toast({ title: "Success", description: registerData.message });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: registerData?.message ?? "Something went wrong...",
        });
        if (registerData?.field) {
          if (registerData.field === "email") {
            setUsedEmails((prev) => [...prev, form.getValues("email")]);
          }

          form.setError(
            registerData.field,
            { message: registerData.message },
            { shouldFocus: true }
          );
        }
      }
    }
    startTransition(() => transition());
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
            disabled={isPending}
          />
          <FormInput
            control={form.control}
            name="name"
            className="w-[300px]"
            label="Name"
            disabled={isPending}
          />
          <FormInput
            control={form.control}
            name="phone"
            className="w-[300px]"
            label="Phone number"
            disabled={isPending}
          />
          <FormInput
            control={form.control}
            name="password"
            className="w-[300px]"
            autoComplete="password"
            label="Password"
            type="password"
            disabled={isPending}
          />
          <FormInput
            control={form.control}
            name="repassword"
            className="w-[300px]"
            autoComplete="re-password"
            label="Repeat Password"
            type="password"
            disabled={isPending}
          />
          <FormCheckbox
            control={form.control}
            name="terms"
            disabled={isPending}
            label="Accept terms policy"
            className="w-full"
            description={
              <Link href="/terms" prefetch={false} className="underline">
                Read Terms Policy
              </Link>
            }
          />
          <Button disabled={isPending} type="submit">
            Register
          </Button>
        </form>
      </Form>
      <AlternativeLoginOptions
        startTransition={startTransition}
        disabled={isPending}
      />
      <span className="text-xs my-4">
        You already have an account?{" "}
        <Link className="text-primary hover:underline" href="/login">
          Log In
        </Link>
      </span>
    </div>
  );
}
