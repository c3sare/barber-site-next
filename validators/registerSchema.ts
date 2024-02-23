import { z } from "zod";
import validator from "validator";
import { passwordSchema } from "./passwordSchema";

export const registerSchema = z
  .object({
    email: z.string().email(),
    name: z.string().trim(),
    password: passwordSchema,
    repassword: z.string(),
    phone: z
      .string()
      .refine((phone) => validator.isMobilePhone(phone, "pl-PL"), {
        message: "Invalid phone number",
      }),
    terms: z.boolean().refine((val) => val, "You need to accept terms"),
  })
  .refine((obj) => obj.password === obj.repassword, {
    message: "Passwords don't match",
    path: ["repassword"],
  });
