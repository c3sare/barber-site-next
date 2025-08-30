"use server";

import db from "@/lib/drizzle";
import { action } from "@/lib/safe-action";
import * as z from "zod/mini";

export const getLeftTimeToResendPasscode = action
  .inputSchema(z.email())
  .action(async ({ parsedInput: email }) => {
    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (!user || !user.passcodeCreatedAt)
      throw new Error("No user or passcode haven't createdAt");

    const timeLeft = user.passcodeCreatedAt.getTime() + 60 * 1000 - Date.now();

    const timeLeftInSeconds = Math.round(timeLeft / 1000);

    return timeLeftInSeconds > 0 ? timeLeftInSeconds : 0;
  });
