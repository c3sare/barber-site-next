"use server";

import { footerComponent } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const deleteFooterComponent = adminAction
  .inputSchema(z.number().int().nonnegative())
  .action(async ({ parsedInput: id }) => {
    await db.delete(footerComponent).where(eq(footerComponent.id, id));

    revalidatePath("/admin/footer");

    return { success: true };
  });
