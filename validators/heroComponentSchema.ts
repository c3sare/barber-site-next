import * as z from "zod/mini";

export const heroComponentSchema = z.object({
  image: z.string().check(
    z.minLength(1, "Image is required"),
    z.refine((val) => (val ? val : ""))
  ),
  text: z.string().check(
    z.minLength(1, "Text is required"),
    z.refine((val) => (val ? val : ""))
  ),
  button: z.optional(
    z.object({
      text: z.string().check(
        z.minLength(1, "Button text is required"),
        z.refine((val) => (val ? val : ""))
      ),
      url: z.string().check(
        z.minLength(1, "Button url is required"),
        z.refine((val) => (val ? val : ""))
      ),
    })
  ),
});
