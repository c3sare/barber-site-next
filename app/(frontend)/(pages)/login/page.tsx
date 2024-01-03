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
    <div className="max-w-7xl mx-auto flex items-center justify-center my-16">
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
          <div className="w-full my-4 relative text-center before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:w-full before:h-[1px] before:bg-black">
            <span className="bg-white relative px-3 text-sm">
              Or continue with
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm">
            <button className="flex items-center gap-2 rounded-sm text-white bg-[#d62d20] font-bold py-2 px-8">
              <GoogleIcon width={16} height={16} />
              <span>Google</span>
            </button>
            <button className="flex items-center gap-2 rounded-sm text-white bg-[#0d1117] font-bold py-2 px-8">
              <GithubIcon width={16} height={16} />
              <span>GitHub</span>
            </button>
          </div>
          <span className="text-xs my-4">
            You are new here?{" "}
            <Link className="text-primary hover:underline" href="/register">
              Get started
            </Link>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;
