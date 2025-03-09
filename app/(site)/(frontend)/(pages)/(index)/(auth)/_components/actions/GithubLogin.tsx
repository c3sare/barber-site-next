"use server";

import { signIn } from "@/auth.config";
import { z } from "zod";

export const GithubLogin = async (args: unknown) => {
  const { callbackUrl } = z
    .object({ callbackUrl: z.string().optional().nullish() })
    .parse(args);

  await signIn("github", { redirectTo: callbackUrl ?? undefined });
};
