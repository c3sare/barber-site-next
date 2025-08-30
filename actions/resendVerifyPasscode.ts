"use server";

import { user } from "@/drizzle/schema";
import ResendPasscodeEmail from "@/emails/resend-passcode";
import db from "@/lib/drizzle";
import { mail } from "@/lib/mail";
import { action } from "@/lib/safe-action";
import { generatePasscode } from "@/utils/generatePasscode";
import { render } from "@react-email/components";
import { eq } from "drizzle-orm";
import * as z from "zod/mini";

export const resendVerifyPasscode = action
  .inputSchema(z.email())
  .action(async ({ parsedInput: email }) => {
    const currentUser = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (!currentUser) throw new Error("No user to update!");

    if (!currentUser?.passcodeCreatedAt)
      throw new Error("passcodeCreatedAt is null");

    const leftTime = Math.round(
      (currentUser.passcodeCreatedAt.getTime() + 60 * 1000 - Date.now()) / 1000
    );

    if (leftTime > 0) throw new Error("Passcode time is still valid");

    const verifyPasscode = generatePasscode();

    const updatedUser = await db
      .update(user)
      .set({ verifyPasscode, passcodeCreatedAt: new Date() })
      .where(eq(user.email, email));

    if (!updatedUser) throw new Error("No user to update!");

    const mailer = await mail();

    await mailer.sendMail({
      to: currentUser.email!,
      subject: "New passcode to verify account - Barberia",
      html: await render(
        ResendPasscodeEmail({
          name: currentUser.name!,
          email: currentUser.email!,
          passcode: verifyPasscode,
        })
      ),
    });

    return { success: true };
  });
