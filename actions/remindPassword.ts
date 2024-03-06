"use server";

import RemindPasswordEmail from "@/emails/remind-password";
import { db } from "@/lib/db";
import { mail } from "@/lib/mail";
import { action } from "@/lib/safe-action";
import { generateToken } from "@/utils/generateToken";
import { remindPasswordSchema } from "@/validators/remindPasswordSchema";
import { render } from "@react-email/components";

export const remindPassword = action(
  remindPasswordSchema,
  async ({ email }) => {
    try {
      const token = generateToken();

      const user = await db.user.update({
        where: {
          email,
        },
        data: {
          changePasswordToken: token,
        },
      });

      if (!user) {
        console.log("User can't be updated");
        return { success: true };
      }

      const mailer = await mail();

      await mailer.sendMail({
        to: user.email!,
        subject: "Change Password Request - Barberia",
        html: render(
          RemindPasswordEmail({ name: user.name!, userId: user.id, token })
        ),
      });

      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: true };
    }
  }
);
