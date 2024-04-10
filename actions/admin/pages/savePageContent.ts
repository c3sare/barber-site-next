"use server";

import { db } from "@/lib/db";
import { adminAction } from "@/lib/safe-action";
import { z } from "zod";
import lz from "lzutf8";

function isValidJson(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const savePageContent = adminAction(
  z.object({
    id: z.string(),
    content: z.string().refine(isValidJson, { message: "Content isn't json" }),
  }),
  async ({ id, content }) => {
    if (!isValidJson) throw new Error("Content isn't json");

    const data = lz.encodeBase64(lz.compress(content));

    await db.page.update({
      where: {
        id,
      },
      data: {
        data,
      },
    });

    return {
      success: true,
    };
  }
);
