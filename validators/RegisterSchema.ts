import { z } from "zod";
import validator from "validator";

export const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password can't be longer than 32 characters")
      .refine((password) => /[$&+,:;=?@#|'<>.^*()%!-]/.test(password), {
        message: "Password must have at least one special character",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must have at least one number",
      })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must have at least one capitalcase character",
      }),
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
