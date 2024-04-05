"use server";

import { db } from "@/lib/db";
import { adminAction } from "@/lib/safe-action";
import { editImageSchema } from "@/validators/editImageSchema";
import { revalidatePath } from "next/cache";

export const updateImage = adminAction(
  editImageSchema,
  async ({ id, name, description }) => {
    const { author, url, ...updateImage } = await db.file.update({
      where: {
        id,
      },
      data: {
        name,
        desc: description,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    revalidatePath("/admin/file-library");

    return { ...updateImage, author: author.name!, preview: url };
  }
);
