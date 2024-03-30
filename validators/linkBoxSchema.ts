import { z } from "zod";

export const linkBoxSchema = z.object({
  title: z.string().min(1, "Title is required").default(""),
  links: z
    .array(
      z.object({
        url: z.string().min(1, "Item url is required").default(""),
        name: z.string().min(1, "Item name is required").default(""),
      })
    )
    .min(1, "Minimum 1 link is required")
    .max(6, "Maximum 6 links are allowed"),
});
