import * as z from "zod/mini";

export const galleryComponentSchema = z.object({
  title: z.string().check(z.minLength(1, "Box name is required")),
  images: z.array(z.object({ imageId: z.string() })),
});
