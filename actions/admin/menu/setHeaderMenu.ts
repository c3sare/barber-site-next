"use server";

import { menu } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import * as z from "zod/mini";

export const setHeaderMenu = adminAction
  .inputSchema(z.number())
  .action(async ({ parsedInput: menuId }) => {
    try {
      await db
        .update(menu)
        .set({ usedBy: null })
        .where(eq(menu.usedBy, "HEADER"));
      await db
        .update(menu)
        .set({ usedBy: "HEADER" })
        .where(eq(menu.id, menuId));

      return { success: true };
    } catch (err) {
      console.error(err);

      return { success: false };
    }
  });
