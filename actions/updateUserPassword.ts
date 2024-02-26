"use server";

import { db } from "@/lib/db";
import { actionWithAuth } from "@/lib/safe-action";
import { changePasswordSchema } from "@/validators/changePasswordSchema";
import bcrypt from "bcryptjs";

export const updateUserPassword = actionWithAuth(
  changePasswordSchema,
  async ({ newPassword, password }, { session }) => {
    try {
      const currentUser = await db.user.findUniqueOrThrow({
        where: {
          id: session.user.id,
        },
      });

      if (!currentUser.password)
        throw new Error("Used account is created by oauth provider");

      const isValidCurrentPassword = await bcrypt.compare(
        password,
        currentUser.password
      );

      if (!isValidCurrentPassword)
        return {
          success: false,
          message: "Current password is invalid",
        };

      const newPasswordHash = await bcrypt.hash(newPassword, 10);

      const user = await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          password: newPasswordHash,
        },
      });

      if (!user)
        return {
          success: false,
        };

      return {
        success: true,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);
