"use server";

import { db } from "@/lib/db";
import { adminAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const deletePage = adminAction(z.string(), async (pageId) => {
  const deletePage = await db.page.delete({
    where: {
      id: pageId,
    },
  });

  revalidatePath("/admin/pages");

  return deletePage;
});
