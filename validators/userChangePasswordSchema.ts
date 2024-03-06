import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const userChangePasswordSchema = z
  .object({
    userId: z.string(),
    token: z.string(),
    password: passwordSchema,
    repassword: z.string(),
  })
  .refine((schema) => schema.password === schema.repassword, {
    message: "Passwords are not same",
  });
