import * as z from "zod/mini";

export const passcodeVerifySchema = z.object({
  email: z.email("Email must be a valid email"),
  passcode: z
    .string()
    .check(
      z.refine((value) => value.length === 6 && !isNaN(Number(value)), {
        message: "Passcode must be 6 digits long",
      })
    ),
});
