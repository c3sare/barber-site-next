import { z } from "zod";

export const menuItemAddEditSchema = z
  .object({
    name: z.string().min(1, "Name is required").max(255, "Name is too long"),
    type: z.enum(["link", "page"]),
  })
  .and(
    z
      .object({
        type: z.literal("page"),
        pageId: z
          .number()
          .min(1, "Page id is required")
          .max(255, "Page id is too long"),
      })
      .or(
        z.object({
          type: z.literal("link"),
          url: z
            .string()
            .min(1, "Url is required")
            .url()
            .max(255, "Url is too long"),
        })
      )
  );
