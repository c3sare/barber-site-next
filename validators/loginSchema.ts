import * as z from "zod/mini";

export const loginSchema = z.object({
  password: z.string().check(z.minLength(8)),
  email: z.email(),
});
