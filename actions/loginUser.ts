"use server";

import { signIn } from "@/auth.config";
import db from "@/lib/drizzle";
import { action } from "@/lib/safe-action";
import { verifyCaptcha } from "@/lib/verifyCaptcha";
import { loginSchema } from "@/validators/loginSchema";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

export const loginUser = action(
  loginSchema.and(
    z.object({
      token: z.string(),
      callbackUrl: z.string().optional().nullable(),
    })
  ),
  async ({ email, password, callbackUrl, token }) => {
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
      };

    const hashedPassword = user.password ?? "";

    const isValidPassword = bcrypt.compare(password, hashedPassword);

    if (!isValidPassword)
      return {
        type: "error",
        message: "Password isn't correct",
        field: "password",
      };

    if (!user.emailVerified && user.accounts.length === 0)
      return redirect(`/verify?email=${user.email}`);

    try {
      return await signIn("credentials", {
        email,
        password,
        redirectTo: callbackUrl ?? "/",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { type: "error", message: "Invalid credentials!" };
          default:
            return { type: "error", message: "Something went wrong!" };
        }
      }

      throw error;
    }
  }
);
