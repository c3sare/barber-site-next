"use server";

import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { passcodeVerifySchema } from "@/validators/passcodeVerifySchema";

export const verifyEmail = action(
  passcodeVerifySchema,
  async ({ email, passcode }) => {
    const user = await db.user.findUniqueOrThrow({
      where: {
        email,
        emailVerified: null,
      },
    });

    if (user.verifyPasscode !== passcode)
      return {
        success: false,
        message: "Invalid passcode",
      };

    await db.user.update({
      where: {
        email,
      },
      data: {
        emailVerified: new Date(),
        verifyPasscode: null,
        passcodeCreatedAt: null,
      },
    });

    return {
      success: true,
    };
  }
);
