"use server";

import { db } from "@/lib/db";
import { adminAction } from "@/lib/safe-action";
import { galleryComponentSchema } from "@/validators/galleryComponentSchema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const upsertGalleryBoxComponent = adminAction(
  galleryComponentSchema.and(
    z.object({ id: z.string().optional().nullable() })
  ),
  async ({ images, id, title }) => {
    const imagesWithoutDuplicates = [
      ...(new Set(images.map((item) => item.imageId)) as unknown as string[]),
    ];
    const checkImages = await db.file.findMany({
      where: {
        id: {
          in: imagesWithoutDuplicates,
        },
      },
    });

    if (imagesWithoutDuplicates.length !== checkImages.length)
      throw new Error("Images from from aren't exist.");

    const imageIds = checkImages.map((item) => ({
      id: item.id,
    }));

    await db.footerComponent.upsert({
      where: {
        id: id ?? "??????????????????????",
        component: "PHOTO_GALLERY",
      },
      create: {
        data: { images, title },
        component: "PHOTO_GALLERY",
        images: {
          connect: imageIds,
        },
      },
      update: {
        data: { images, title },
        images: {
          connect: imageIds,
        },
      },
    });

    revalidatePath("/admin/footer");

    return { success: true };
  }
);
