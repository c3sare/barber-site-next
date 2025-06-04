"use server";

import { menu } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { z } from "zod";

export const addMenu = adminAction
  .inputSchema(z.string())
  .action(async ({ parsedInput: title }) => {
    try {
      await db.insert(menu).values({
        title,
      });

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  });
