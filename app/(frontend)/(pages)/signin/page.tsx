"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";

const SignInPage = () => {
  const form = useZodForm({
    schema: z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  });

  const onSubmit = form.handleSubmit((data) => {
    data;
  });

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center my-16">
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex gap-2 flex-col items-center">
          <h1 className="text-4xl after:left-1/2 after:-translate-x-1/2">
            Sign In
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
          />
          <Button type="submit">Sign In</Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;
