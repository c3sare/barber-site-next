"use server";

import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { userChangePasswordSchema } from "@/validators/userChangePasswordSchema";
import bcrypt from "bcryptjs";

export const userChangePassword = action(
  userChangePasswordSchema,
  async ({ userId, token, password }) => {
    try {
      const newPassword = await bcrypt.hash(password, 10);

      await db.user.update({
        where: {
          id: userId,
          changePasswordToken: token,
        },
        data: {
          changePasswordToken: null,
          password: newPassword,
        },
      });

      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  }
);
