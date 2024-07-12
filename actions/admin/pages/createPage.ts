"use server";

import { page } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { createPageSchema } from "@/validators/createPageSchema";
import { revalidatePath } from "next/cache";

export const createPage = adminAction
  .schema(createPageSchema)
  .action(async ({ parsedInput: { name, slug }, ctx: { id: creatorId } }) => {
    const createdPage = await db
      .insert(page)
      .values({
        name,
        slug,
        data: null,
        creatorId,
      })
      .returning();

    revalidatePath("/admin/pages");

    return { success: true, page: createdPage };
  });
