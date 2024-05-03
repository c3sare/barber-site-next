"use server";

import { file } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { editImageSchema } from "@/validators/editImageSchema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateImage = adminAction(
  editImageSchema,
  async ({ id, name, description }) => {
    const updateImages = await db
      .update(file)
      .set({
        name,
        desc: description,
      })
      .where(eq(file.id, id))
      .returning();

    const { url, ...updatedImage } = updateImages[0]!;

    const author = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, updatedImage.userId),
    });

    revalidatePath("/admin/file-library");

    return { ...updatedImage, author: author!.name!, preview: url };
  }
);
