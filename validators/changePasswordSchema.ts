import * as z from "zod/mini";
import { passwordSchema } from "./passwordSchema";

export const changePasswordSchema = z
  .object({
    password: z.string(),
    newPassword: passwordSchema,
    reNewPassword: z.string(),
  })
  .check(
    z.refine((obj) => obj.newPassword === obj.reNewPassword, {
      message: "Passwords don't match",
      path: ["repassword"],
    })
  );
