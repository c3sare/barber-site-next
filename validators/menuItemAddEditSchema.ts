import * as z from "zod/mini";

export const menuItemAddEditSchema = z.intersection(
  z.object({
    name: z
      .string()
      .check(
        z.minLength(1, "Name is required"),
        z.maxLength(255, "Name is too long")
      ),
    type: z.union([z.literal("link"), z.literal("page")]),
  }),
  z.union([
    z.object({
      type: z.literal("link", { message: "", error: "" }),
      url: z
        .url()
        .check(
          z.minLength(1, "Url is required"),
          z.maxLength(255, "Url is too long")
        ),
    }),
    z.object({
      type: z.literal("page", { message: "", error: "" }),
      pageId: z
        .number()
        .check(
          z.minimum(1, "Page id is required"),
          z.maximum(255, "Page id is too long")
        ),
    }),
  ])
);
