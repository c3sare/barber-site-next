"use server";

import { user } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { action } from "@/lib/safe-action";
import { userChangePasswordSchema } from "@/validators/userChangePasswordSchema";
import bcrypt from "bcryptjs";
import { and, eq } from "drizzle-orm";

export const userChangePassword = action(
  userChangePasswordSchema,
  async ({ userId, token, password }) => {
    try {
      const newPassword = await bcrypt.hash(password, 10);

      await db
        .update(user)
        .set({
          changePasswordToken: null,
          password: newPassword,
        })
        .where(and(eq(user.id, userId), eq(user.changePasswordToken, token)));

      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
);
