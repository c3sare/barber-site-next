import { z } from "zod";

export const editImageSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});
