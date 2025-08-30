import * as z from "zod/mini";
import { passwordSchema } from "./passwordSchema";

export const userChangePasswordSchema = z
  .object({
    userId: z.string(),
    token: z.string(),
    password: passwordSchema,
    repassword: z.string(),
  })
  .check(
    z.refine((schema) => schema.password === schema.repassword, {
      message: "Passwords are not same",
    })
  );
