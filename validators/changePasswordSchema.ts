import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const changePasswordSchema = z
  .object({
    password: z.string(),
    newPassword: passwordSchema,
    reNewPassword: z.string(),
  })
  .refine((obj) => obj.newPassword === obj.reNewPassword, {
    message: "Passwords don't match",
    path: ["repassword"],
  });
