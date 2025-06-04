"use server";

import { user } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { actionWithAuth } from "@/lib/safe-action";
import { changePasswordSchema } from "@/validators/changePasswordSchema";
import bcrypt from "bcrypt-edge";
import { eq } from "drizzle-orm";

export const updateUserPassword = actionWithAuth
  .inputSchema(changePasswordSchema)
  .action(async ({ parsedInput: { newPassword, password }, ctx: session }) => {
    try {
      const currentUser = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.id, session.user.id!),
      });

      if (!currentUser?.password)
        throw new Error("Used account is created by oauth provider");

      const isValidCurrentPassword = bcrypt.compareSync(
        password,
        currentUser.password
      );

      if (!isValidCurrentPassword)
        return {
          success: false,
          message: "Current password is invalid",
        };

      const newPasswordHash = bcrypt.hashSync(newPassword, 10);

      const updatedUser = await db
        .update(user)
        .set({
          password: newPasswordHash,
        })
        .where(eq(user.id, session.user.id!));

      if (!updatedUser)
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
  });
