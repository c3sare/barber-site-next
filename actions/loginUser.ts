"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { loginSchema } from "@/validators/loginSchema";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

export const loginUser = action(
  loginSchema.and(z.object({ callbackUrl: z.string().optional().nullable() })),
  async ({ email, password, callbackUrl }) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      include: {
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
