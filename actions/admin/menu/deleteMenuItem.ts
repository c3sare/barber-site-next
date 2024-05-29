"use server";

import { menuItem } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const deleteMenuItem = adminAction(z.number(), async (id) => {
  try {
    const item = await db
      .delete(menuItem)
      .where(eq(menuItem.id, id))
      .returning();

    const firstItem = item.at(0);

    if (firstItem) revalidatePath(`/admin/menu/${firstItem.menuId}`);

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
});
