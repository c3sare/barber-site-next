import validator from "validator";
import { z } from "zod";

export const profileInformationsSchema = z.object({
  name: z.string().trim(),
  phone: z
    .string()
    .trim()
    .refine((phone) => validator.isMobilePhone(phone, "pl-PL"), {
      message: "Invalid phone number",
    }),
  email: z.string().email(),
});
