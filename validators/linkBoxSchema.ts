import { z } from "zod";

export const linkBoxSchema = z.object({
  title: z.string(),
  links: z.array(
    z.object({
      url: z.string(),
      name: z.string(),
    })
  ),
});
