"use server";

import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { verifyCaptcha } from "@/lib/verifyCaptcha";
import { registerSchema } from "@/validators/registerSchema";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const registerUser = action(
  registerSchema.and(z.object({ captcha: z.string() })),
  async ({ name, email, password, phone, captcha }) => {
    const isValidCaptcha = await verifyCaptcha(captcha);

    if (!isValidCaptcha)
      return {
        type: "error",
        message: "Captcha value isn't valid",
      };

    const currentUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (currentUser) {
      return {
        type: "error",
        message: "User with this email already exist",
        field: "email",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassword,
      },
    });

    if (!user) throw new Error("Couldn't create user.");

    return {
      type: "success",
      message: "Your account has been successfully created",
    };
  }
);
