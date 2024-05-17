"use server";

import { menu as menuSchema } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  id: z.number().int().nonnegative(),
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
});

export const updateMenuTitle = adminAction(schema, async ({ id, title }) => {
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
