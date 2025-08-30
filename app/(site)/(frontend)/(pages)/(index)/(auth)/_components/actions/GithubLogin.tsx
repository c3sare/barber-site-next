"use server";

import { signIn } from "@/auth.config";
import * as z from "zod/mini";

export const GithubLogin = async (args: unknown) => {
  const { callbackUrl } = z
    .object({ callbackUrl: z.nullish(z.optional(z.string())) })
    .parse(args);

  await signIn("github", { redirectTo: callbackUrl ?? undefined });
};
