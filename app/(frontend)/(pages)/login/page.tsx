"use client";

import { FormInput } from "@/components/form/FormInput";
import GithubIcon from "@/components/icons/GithubIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useZodForm } from "@/hooks/useZodForm";
import Link from "next/link";
import { z } from "zod";
import { signInCredentials } from "./actions/signInCredentials";
import AlternativeLoginOptions from "../(index)/(auth)/_components/AlternativeLoginOptions";

const SignInPage = () => {
  const form = useZodForm({
    schema: z.object({
      email: z.string().email(),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
    }),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const action = await signInCredentials(data);
  });

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
          />
          <FormInput
            control={form.control}
            name="password"
            className="w-[300px]"
            label="Password"
            type="password"
          />
          <Button type="submit">Log in</Button>
        </form>
      </Form>
      <AlternativeLoginOptions />
      <span className="text-xs my-4">
        You are new here?{" "}
        <Link className="text-primary hover:underline" href="/register">
          Get started
        </Link>
      </span>
    </div>
  );
};

export default SignInPage;
