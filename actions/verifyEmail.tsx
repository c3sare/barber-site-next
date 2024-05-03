"use server";

import db from "@/lib/drizzle";
import { action } from "@/lib/safe-action";
import { passcodeVerifySchema } from "@/validators/passcodeVerifySchema";
import { eq, isNull } from "drizzle-orm";
import { user as userSchema } from "@/drizzle/schema";

export const verifyEmail = action(
  passcodeVerifySchema,
  async ({ email, passcode }) => {
    const user = await db.query.user.findFirst({
      where: (users, { eq, and }) =>
        and(eq(users.email, email), isNull(users.emailVerified)),
    });

    if (!user) return { success: true };

    if (user.verifyPasscode !== passcode)
      return {
        success: false,
        message: "Invalid passcode",
      };

    await db
      .update(userSchema)
      .set({
        emailVerified: new Date(),
        verifyPasscode: null,
        passcodeCreatedAt: null,
      })
      .where(eq(userSchema.email, email));

    return {
      success: true,
    };
  }
);
