"use server";

import { menu } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const deleteMenu = adminAction
  .inputSchema(z.number())
  .action(async ({ parsedInput: id }) => {
    try {
      await db.delete(menu).where(eq(menu.id, id));

      revalidatePath("/admin/menu");

      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  });
