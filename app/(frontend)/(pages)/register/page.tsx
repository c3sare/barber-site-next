"use client";

import { FormInput } from "@/components/form/FormInput";
import GithubIcon from "@/components/icons/GithubIcon";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/useZodForm";
import Link from "next/link";
import { RegisterSchema } from "@/validators/RegisterSchema";
import FormCheckbox from "@/components/form/FormCheckbox";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleIcon from "@/components/icons/GoogleIcon";

export default function Register() {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const form = useZodForm({
    schema: RegisterSchema,
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
    if (!captchaValue) return;
    console.log(data);
  });

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center my-16">
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
          />
          <FormInput
            control={form.control}
            name="password"
            className="w-[300px]"
            autoComplete="password"
            label="Password"
            type="password"
          />
          <FormInput
            control={form.control}
            name="repassword"
            className="w-[300px]"
            autoComplete="re-password"
            label="Repeat Password"
            type="password"
          />
          <FormInput
            control={form.control}
            name="name"
            className="w-[300px]"
            label="Name"
          />
          <FormInput
            control={form.control}
            name="phone"
            className="w-[300px]"
            label="Phone number"
          />
          <FormCheckbox
            control={form.control}
            name="terms"
            label="Accept terms policy"
            className="w-full"
            description={
              <Link href="/terms" className="underline">
                Read Terms Policy
              </Link>
            }
          />
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY as string}
            onChange={(value) => setCaptchaValue(value)}
          />
          <Button disabled={!captchaValue} type="submit">
            Register
          </Button>
          <div className="w-full my-4 relative text-center before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:w-full before:h-[1px] before:bg-black">
            <span className="bg-white relative px-3 text-sm">
              Or continue with
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm">
            <button className="flex items-center gap-2 rounded-sm text-white bg-[#d62d20] font-bold py-2 px-8 hover:opacity-90 transition-opacity">
              <GoogleIcon width={16} height={16} />
              <span>Google</span>
            </button>
            <button className="flex items-center gap-2 rounded-sm text-white bg-[#0d1117] font-bold py-2 px-8 hover:opacity-90 transition-opacity">
              <GithubIcon width={16} height={16} />
              <span>GitHub</span>
            </button>
          </div>
          <span className="text-xs my-4">
            You already have an account?{" "}
            <Link className="text-primary hover:underline" href="/login">
              Log In
            </Link>
          </span>
        </form>
      </Form>
    </div>
  );
}
