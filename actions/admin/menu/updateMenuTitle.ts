"use server";

import { menu as menuSchema } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as z from "zod/mini";

const schema = z.object({
  id: z.int().check(z.nonnegative()),
  title: z
    .string()
    .check(
      z.minLength(1, "Title is required"),
      z.maxLength(255, "Title is too long")
    ),
});

export const updateMenuTitle = adminAction
  .inputSchema(schema)
  .action(async ({ parsedInput: { id, title } }) => {
    try {
      await db.update(menuSchema).set({ title }).where(eq(menuSchema.id, id));

      revalidatePath(`/admin/menu`);
      revalidatePath(`/admin/menu/${id}`);

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  });
