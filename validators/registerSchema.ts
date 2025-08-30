import * as z from "zod/mini";
import validator from "validator";
import { passwordSchema } from "./passwordSchema";

export const registerSchema = z
  .object({
    email: z.email(),
    name: z.string().check(z.trim()),
    password: passwordSchema,
    repassword: z.string(),
    phone: z
      .string()
      .check(
        z.refine((phone) => validator.isMobilePhone(phone, "pl-PL"), {
          message: "Invalid phone number",
        })
      ),
    terms: z
      .boolean()
      .check(z.refine((val) => val, "You need to accept terms")),
  })
  .check(
    z.refine((obj) => obj.password === obj.repassword, {
      message: "Passwords don't match",
      path: ["repassword"],
    })
  );
