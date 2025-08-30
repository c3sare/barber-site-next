"use server";

import { footerComponent } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as z from "zod/mini";

export const deleteFooterComponent = adminAction
  .inputSchema(z.int().check(z.nonnegative()))
  .action(async ({ parsedInput: id }) => {
    await db.delete(footerComponent).where(eq(footerComponent.id, id));

    revalidatePath("/admin/footer");

    return { success: true };
  });
