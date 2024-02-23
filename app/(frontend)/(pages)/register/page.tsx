"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/useZodForm";
import Link from "next/link";
import { registerSchema } from "@/validators/registerSchema";
import FormCheckbox from "@/components/form/FormCheckbox";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import AlternativeLoginOptions from "../(index)/(auth)/_components/AlternativeLoginOptions";
import { useAction } from "next-safe-action/hooks";
import { registerUser } from "@/actions/registerUser";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [usedEmails, setUsedEmails] = useState<string[]>([]);
  const captchaRef = useRef<ReCAPTCHA>(null);
  const { toast } = useToast();
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
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
    onSettled: () => {
      captchaRef.current?.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong...",
        description: "Try again after a while",
      });
    },
    onSuccess: (data) => {
      if (data.type === "success") {
        router.push("/login");
        toast({ title: "Success", description: data.message });
      } else if (data.type === "error") {
        if (data.field) {
          if (data.field === "email") {
            setUsedEmails((prev) => [...prev, form.getValues("email")]);
          }

          form.setError(
            data.field,
            { message: data.message },
            { shouldFocus: true }
          );
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: data.message,
          });
        }
      }
    },
  });

  const isLoading = serverAction.status === "executing";

  const onSubmit = form.handleSubmit((data) => {
    if (!captchaValue) return;
    if (usedEmails.includes(data.email))
      return form.setError(
        "email",
        { message: "User with this email already exist" },
        { shouldFocus: true }
      );
    setCaptchaValue(null);
    serverAction.execute({ ...data, captcha: captchaValue });
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
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY as string}
            onChange={(value) => setCaptchaValue(value)}
            ref={captchaRef}
          />
          <Button disabled={isLoading} type="submit">
            Register
          </Button>
        </form>
      </Form>
      <AlternativeLoginOptions />
      <span className="text-xs my-4">
        You already have an account?{" "}
        <Link className="text-primary hover:underline" href="/login">
          Log In
        </Link>
      </span>
    </div>
  );
}
