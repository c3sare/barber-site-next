"use server";

import { signIn } from "@/auth.config";
import { action } from "@/lib/safe-action";
import { z } from "zod";

export const GoogleLogin = action(
  z.object({ callbackUrl: z.string().optional() }),
  async ({ callbackUrl }) => await signIn("google", { redirectTo: callbackUrl })
);
