import * as z from "zod/mini";

export const createPageSchema = z.object({
  name: z
    .string()
    .check(
      z.minLength(1, "Name is required"),
      z.maxLength(255, "Name is too long")
    ),
  slug: z
    .string()
    .check(
      z.minLength(1, "Slug is required"),
      z.maxLength(255, "Slug is too long"),
      z.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    ),
});
