"use server";

import { menuItem } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const changeMenuItemsOrder = adminAction
  .inputSchema(z.array(z.number()))
  .action(async ({ parsedInput: items }) => {
    try {
      await Promise.all(
        items.map((id, index) =>
          db.update(menuItem).set({ order: index }).where(eq(menuItem.id, id))
        )
      );

      return {
        success: true,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
      };
    }
  });
