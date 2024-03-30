import { z } from "zod";

export const heroComponentSchema = z.object({
  image: z.string().min(1, "Image is required").default(""),
  text: z.string().min(1, "Text is required").default(""),
  button: z.optional(
    z.object({
      text: z.string().min(1, "Button text is required").default(""),
      url: z.string().min(1, "Button url is required").default(""),
    })
  ),
});
