import * as z from "zod/mini";

export const passwordSchema = z.string().check(
  z.minLength(8, "Password must be at least 8 characters long"),
  z.maxLength(32, "Password can't be longer than 32 characters"),
  z.refine((password) => /[$&+,:;=?@#|'<>.^*()%!-]/.test(password), {
    message: "Password must have at least one special character",
  }),
  z.refine((password) => /[0-9]/.test(password), {
    message: "Password must have at least one number",
  }),
  z.refine((password) => /[A-Z]/.test(password), {
    message: "Password must have at least one capitalcase character",
  })
);
