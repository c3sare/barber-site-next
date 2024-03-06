import { z } from "zod";

export const remindPasswordSchema = z.object({
  email: z.string().email(),
});
