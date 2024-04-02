import { z } from "zod";

export const galleryComponentSchema = z.object({
  title: z.string().min(1, "Box name is required"),
  images: z
    .object({
      imageId: z.string().min(1, "Image is required"),
    })
    .array(),
});
