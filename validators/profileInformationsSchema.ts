import validator from "validator";
import * as z from "zod/mini";

export const profileInformationsSchema = z.object({
  name: z.string().check(z.trim()),
  phone: z.string().check(
    z.trim(),
    z.refine((phone) => validator.isMobilePhone(phone, "pl-PL"), {
      message: "Invalid phone number",
    })
  ),
  email: z.email(),
});
