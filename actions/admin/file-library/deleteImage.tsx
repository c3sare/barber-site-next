"use server";

import { delete_resources, destroy } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { adminAction } from "@/lib/safe-action";
import { z } from "zod";

export const deleteImage = adminAction(
  z.string().or(z.array(z.string())),
  async (input) => {
    const imageIds = typeof input === "string" ? [input] : input;

    const images = await db.file.findMany({
      where: {
        id: {
          in: imageIds,
        },
      },
    });

    if (images.length !== imageIds.length)
      throw new Error("No all images to delete was found!");

    await db.file.deleteMany({
      where: {
        id: {
          in: imageIds,
        },
      },
    });

    await delete_resources(imageIds);

    return { success: true };
  }
);
