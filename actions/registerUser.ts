"use server";

import { user } from "@/drizzle/schema";
import AfterRegisterEmail from "@/emails/after-register";
import db from "@/lib/drizzle";
import { mail } from "@/lib/mail";
import { action } from "@/lib/safe-action";
import { verifyCaptcha } from "@/lib/verifyCaptcha";
import { generatePasscode } from "@/utils/generatePasscode";
import { registerSchema } from "@/validators/registerSchema";
import { render } from "@react-email/components";
import bcrypt from "bcrypt-edge";
import { z } from "zod";

export const registerUser = action
  .schema(registerSchema.and(z.object({ captcha: z.string() })))
  .action(
    async ({ parsedInput: { name, email, password, phone, captcha } }) => {
      const isValidCaptcha = await verifyCaptcha(captcha);

      if (!isValidCaptcha)
        return {
          type: "error",
          message: "Captcha value isn't valid",
        } as const;

      const currentUser = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, email),
      });

      if (currentUser) {
        return {
          type: "error",
          message: "User with this email already exist",
          field: "email",
        } as const;
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const passcode = generatePasscode();

      const createdUser = await db.insert(user).values([
        {
          email,
          name,
          phone,
          password: hashedPassword,
          verifyPasscode: passcode,
          passcodeCreatedAt: new Date(),
        },
      ]);

      if (!createdUser) throw new Error("Couldn't create user.");

      const mailer = await mail();

      await mailer.sendMail({
        to: email,
        subject: "Email confirmation - Barberia",
        html: await render(AfterRegisterEmail({ name, passcode, email })),
      });

      return {
        type: "success",
        message:
          "Your account has been successfully created, please check your email to verify account",
      } as const;
    }
  );
