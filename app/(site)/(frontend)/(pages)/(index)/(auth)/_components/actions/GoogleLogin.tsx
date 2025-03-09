"use server";

import { signIn } from "@/auth.config";
import { z } from "zod";

export const GoogleLogin = async (args: unknown) => {
  const { callbackUrl } = z
    .object({ callbackUrl: z.string().optional().nullish() })
    .parse(args);

  await signIn("google", { redirectTo: callbackUrl ?? undefined });
};
