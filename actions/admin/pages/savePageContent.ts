"use server";

import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import * as z from "zod/mini";
import lz from "lzutf8";
import { page } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

function isValidJson(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const savePageContent = adminAction
  .inputSchema(
    z.object({
      id: z.int().check(z.nonnegative()),
      content: z
        .string()
        .check(z.refine(isValidJson, { message: "Content isn't json" })),
    })
  )
  .action(async ({ parsedInput: { id, content } }) => {
    if (!isValidJson) throw new Error("Content isn't json");

    const data = lz.encodeBase64(lz.compress(content));

    await db.update(page).set({ data }).where(eq(page.id, id));

    return { success: true };
  });
