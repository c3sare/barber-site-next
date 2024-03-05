"use server";

import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { passcodeVerifySchema } from "@/validators/passcodeVerifySchema";

export const verifyEmail = action(
  passcodeVerifySchema,
  async ({ email, passcode }) => {
    const user = await db.user.update({
      where: {
        email,
        verifyPasscode: passcode,
        emailVerified: null,
      },
      data: {
        emailVerified: new Date(),
        verifyPasscode: null,
      },
    });

    if (!user)
      return {
        success: false,
        message: "Invalid passcode",
      };

    return {
      success: true,
    };
  }
);
