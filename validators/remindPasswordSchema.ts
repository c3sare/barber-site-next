import * as z from "zod/mini";

export const remindPasswordSchema = z.object({ email: z.email() });
