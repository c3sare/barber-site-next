"use server";

import { user } from "@/drizzle/schema";
import RemindPasswordEmail from "@/emails/remind-password";
import db from "@/lib/drizzle";
import { mail } from "@/lib/mail";
import { action } from "@/lib/safe-action";
import { generateToken } from "@/utils/generateToken";
import { remindPasswordSchema } from "@/validators/remindPasswordSchema";
import { render } from "@react-email/components";
import { eq } from "drizzle-orm";

export const remindPassword = action(
  remindPasswordSchema,
  async ({ email }) => {
    try {
      const token = generateToken();

      const currentUser = await db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, email),
      });

      await db
        .update(user)
        .set({
          changePasswordToken: token,
        })
        .where(eq(user.email, email));

      if (!currentUser) {
        console.log("User can't be updated");
        return { success: true };
      }

      const mailer = await mail();

      await mailer.sendMail({
        to: currentUser.email!,
        subject: "Change Password Request - Barberia",
        html: render(
          RemindPasswordEmail({
            name: currentUser.name!,
            userId: currentUser.id,
            token,
          })
        ),
      });

      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: true };
    }
  }
);
