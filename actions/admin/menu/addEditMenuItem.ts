"use server";

import { menuItem } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { menuItemAddEditSchema } from "@/validators/menuItemAddEditSchema";
import { eq, max } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addEditMenuItem = adminAction
  .schema(
    menuItemAddEditSchema.and(
      z.object({ menuId: z.number(), id: z.number().optional().nullable() })
    )
  )
  .action(
    async ({ parsedInput: { id, menuId, ...data }, ctx: { id: userId } }) => {
      console.log({ ...data, id, menuId });
      try {
        if (!id) {
          const most = await db
            .select({ value: max(menuItem.order) })
            .from(menuItem);

          const order = most.at(0)?.value ?? 0;

          await db.insert(menuItem).values({
            pageId: null,
            ...data,
            menuId,
            creatorId: userId,
            order: order + 1,
          });
        } else {
          db.update(menuItem)
            .set({ pageId: null, ...data, creatorId: userId })
            .where(eq(menuItem.id, id));
        }

        revalidatePath(`/admin/menu/${menuId}`);

        return {
          success: true,
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
        };
      }
    }
  );
