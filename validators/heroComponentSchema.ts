import { z } from "zod";

export const heroComponentSchema = z.object({
  image: z.string(),
  text: z.string(),
  button: z.optional(
    z.object({
      text: z.string(),
      link: z.object({
        type: z.enum(["internal", "external"]),
        url: z.string(),
      }),
    })
  ),
});
