import { z } from "zod";

export const passwordSchema = z
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
  });
