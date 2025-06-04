"use server";

import { file } from "@/drizzle/schema";
import { delete_resources } from "@/lib/cloudinary";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const deleteImage = adminAction
  .inputSchema(z.string().or(z.array(z.string())))
  .action(async ({ parsedInput: input }) => {
    const imageIds = typeof input === "string" ? [input] : input;

    const images = await db.query.file.findMany({
      where: (file, { inArray }) => inArray(file.id, imageIds),
    });

    if (images.length !== imageIds.length)
      throw new Error("No all images to delete was found!");

    await db.delete(file).where(inArray(file.id, imageIds));

    await delete_resources(imageIds);

    revalidatePath("/admin/file-library");

    return { success: true };
  });
