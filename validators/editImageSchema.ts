import * as z from "zod/mini";

export const editImageSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});
