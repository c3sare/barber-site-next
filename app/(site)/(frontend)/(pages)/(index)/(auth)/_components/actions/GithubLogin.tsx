"use server";

import { signIn } from "@/auth.config";
import { action } from "@/lib/safe-action";
import { z } from "zod";

export const GithubLogin = action.schema(z.object({ callbackUrl: z.string().optional() })).action(
  async ({ parsedInput: { callbackUrl } }) => await signIn("github", { redirectTo: callbackUrl })
);
