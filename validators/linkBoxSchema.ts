import * as z from "zod/mini";

export const linkBoxSchema = z.object({
  title: z.string().check(
    z.minLength(1, "Title is required"),
    z.refine((val) => (val ? val : ""))
  ),
  links: z
    .array(
      z.object({
        url: z.string().check(
          z.minLength(1, "Item url is required"),
          z.refine((val) => (val ? val : ""))
        ),
        name: z.string().check(
          z.minLength(1, "Item name is required"),
          z.refine((val) => (val ? val : ""))
        ),
      })
    )
    .check(
      z.minLength(1, "Minimum 1 link is required"),
      z.maxLength(6, "Maximum 6 links are allowed")
    ),
});
