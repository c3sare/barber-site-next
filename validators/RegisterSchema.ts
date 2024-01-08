import { z } from "zod";
import validator from "validator";
import { passwordSchema } from "./passwordSchema";

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,
    repassword: z.string(),
    name: z.string().trim(),
    phone: z
      .string()
      .refine((phone) => validator.isMobilePhone(phone, "pl-PL"), {
        message: "Invalid phone number",
      }),
    terms: z.boolean(),
  })
  .refine((obj) => obj.password === obj.repassword, {
    message: "Passwords don't match",
    path: ["repassword"],
  });
