"use server";

import { signIn } from "@/auth.config";
import db from "@/lib/drizzle";
import { action } from "@/lib/safe-action";
import { verifyCaptcha } from "@/lib/verifyCaptcha";
import { loginSchema } from "@/validators/loginSchema";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

export const loginUser = action
  .schema(
    loginSchema.and(
      z.object({
        token: z.string(),
        callbackUrl: z.string().optional().nullable(),
      })
    )
  )
  .action(async ({ parsedInput: { email, password, callbackUrl, token } }) => {
    const isValidCaptchaToken = await verifyCaptcha(token);

    if (!isValidCaptchaToken) {
      return {
        type: "error",
        message: "Captcha value isn't valid",
      };
    }

    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
      with: {
        accounts: true,
      },
    });

    if (!user)
      return {
        type: "error",
        message: "User with this email don't exist",
        field: "email",
      } as const;

    const hashedPassword = user.password ?? "";

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword)
      return {
        type: "error",
        message: "Password isn't correct",
        field: "password",
      } as const;

    if (!user.emailVerified && user.accounts.length === 0)
      return redirect(`/verify?email=${user.email}`);

    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl ?? "/",
    });
  });
