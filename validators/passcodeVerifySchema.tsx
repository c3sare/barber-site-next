import { z } from "zod";

export const passcodeVerifySchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Email must be a valid email"),
  passcode: z
    .string()
    .refine((value) => value.length === 6 && !isNaN(Number(value)), {
      message: "Passcode must be 6 digits long",
    }),
});
