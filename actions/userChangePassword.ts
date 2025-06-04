"use server";

import { user } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { action } from "@/lib/safe-action";
import { userChangePasswordSchema } from "@/validators/userChangePasswordSchema";
import bcrypt from "bcrypt-edge";
import { and, eq } from "drizzle-orm";

export const userChangePassword = action
  .inputSchema(userChangePasswordSchema)
  .action(async ({ parsedInput: { userId, token, password } }) => {
    try {
      const newPassword = bcrypt.hashSync(password, 10);

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
  });
