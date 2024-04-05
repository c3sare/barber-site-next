"use server";

import { db } from "@/lib/db";
import { adminAction } from "@/lib/safe-action";
import { createPageSchema } from "@/validators/createPageSchema";
import { revalidatePath } from "next/cache";

export const createPage = adminAction(
  createPageSchema,
  async ({ name, slug }) => {
    const page = await db.page.create({
      data: {
        name,
        slug,
        data: {},
      },
    });

    revalidatePath("/admin/pages");

    return { success: true, page };
  }
);
