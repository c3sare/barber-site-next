"use server";

import { signIn } from "@/auth.config";
import * as z from "zod/mini";

export const GoogleLogin = async (args: unknown) => {
  const { callbackUrl } = z
    .object({ callbackUrl: z.nullish(z.optional(z.string())) })
    .parse(args);

  await signIn("google", { redirectTo: callbackUrl ?? undefined });
};
