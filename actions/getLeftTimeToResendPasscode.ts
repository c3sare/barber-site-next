"use server";

import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { z } from "zod";

export const getLeftTimeToResendPasscode = action(
  z.string().email(),
  async (email) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user.passcodeCreatedAt)
      throw new Error("No user or passcode haven't createdAt");

    const timeLeft = user.passcodeCreatedAt.getTime() + 60 * 1000 - Date.now();

    const timeLeftInSeconds = Math.round(timeLeft / 1000);

    return timeLeftInSeconds > 0 ? timeLeftInSeconds : 0;
  }
);
