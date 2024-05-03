"use server";

import { file, footerComponent, usedFooterImages } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { galleryComponentSchema } from "@/validators/galleryComponentSchema";
import { and, eq, notInArray } from "drizzle-orm";
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
    const checkImages = await db.query.file.findMany({
      where: (file, { inArray }) => inArray(file.id, imagesWithoutDuplicates),
    });

    if (imagesWithoutDuplicates.length !== checkImages.length)
      throw new Error("Images from from aren't exist.");

    const imageIds = checkImages.map((item) => ({
      id: item.id,
    }));

    const footerComp = await db
      .insert(footerComponent)
      .values({
        data: { images, title },
        component: "PHOTO_GALLERY",
      })
      .onConflictDoUpdate({
        target: footerComponent.id,
        set: {
          data: { images, title },
        },
      })
      .returning();

    await db
      .insert(usedFooterImages)
      .values(imageIds.map((item) => ({ a: item.id, b: footerComp.at(0)!.id })))
      .onConflictDoNothing();

    await db.delete(usedFooterImages).where(
      and(
        notInArray(
          usedFooterImages.a,
          imageIds.map((item) => item.id)
        ),
        eq(usedFooterImages.b, footerComp.at(0)!.id)
      )
    );

    revalidatePath("/admin/footer");

    return { success: true };
  }
);
