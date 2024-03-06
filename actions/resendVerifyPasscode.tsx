"use server";

import ResendPasscodeEmail from "@/emails/resend-passcode";
import { db } from "@/lib/db";
import { mail } from "@/lib/mail";
import { action } from "@/lib/safe-action";
import { generatePasscode } from "@/utils/generatePasscode";
import { render } from "@react-email/components";
import { z } from "zod";

export const resendVerifyPasscode = action(
  z.string().email(),
  async (email) => {
    const user = await db.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    if (!user.passcodeCreatedAt) throw new Error("passcodeCreatedAt is null");

    const leftTime = Math.round(
      (user.passcodeCreatedAt.getTime() + 60 * 1000 - Date.now()) / 1000
    );

    if (leftTime > 0) throw new Error("Passcode time is still valid");

    const verifyPasscode = generatePasscode();

    const updatedUser = await db.user.update({
      where: {
        email,
      },
      data: {
        verifyPasscode,
        passcodeCreatedAt: new Date(),
      },
    });

    if (!updatedUser) throw new Error("No user to update!");

    const mailer = await mail();

    await mailer.sendMail({
      to: updatedUser.email!,
      subject: "New passcode to verify account - Barberia",
      html: render(
        ResendPasscodeEmail({
          name: updatedUser.name!,
          email: updatedUser.email!,
          passcode: verifyPasscode,
        })
      ),
    });

    return { success: true };
  }
);
