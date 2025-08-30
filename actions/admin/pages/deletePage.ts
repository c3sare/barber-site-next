"use server";

import { page } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as z from "zod/mini";

export const deletePage = adminAction
  .inputSchema(z.int().check(z.nonnegative()))
  .action(async ({ parsedInput: pageId }) => {
    const deletePage = await db
      .delete(page)
      .where(eq(page.id, pageId))
      .returning();

    revalidatePath("/admin/pages");

    return deletePage;
  });
