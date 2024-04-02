"use server";

import { db } from "@/lib/db";
import { adminAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const deleteFooterComponent = adminAction(z.string(), async (id) => {
  await db.footerComponent.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/footer");

  return { success: true };
});
