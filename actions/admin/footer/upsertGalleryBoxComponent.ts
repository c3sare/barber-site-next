"use server";

import { footerComponent } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { removeDuplicates } from "@/lib/utils";
import { galleryComponentSchema } from "@/validators/galleryComponentSchema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const upsertGalleryBoxComponent = adminAction
  .inputSchema(
    galleryComponentSchema.and(
      z.object({ id: z.number().optional().nullable() })
    )
  )
  .action(async ({ parsedInput: { images, id, title } }) => {
    const imagesWithoutDuplicates = removeDuplicates(
      images.map((item) => item.imageId)
    );
    const checkImages = await db.query.file.findMany({
      where: (file, { inArray }) => inArray(file.id, imagesWithoutDuplicates),
    });

    if (imagesWithoutDuplicates.length !== checkImages.length)
      throw new Error("Images from from aren't exist.");

    let footerComp: (typeof footerComponent.$inferSelect)[];

    if (id) {
      footerComp = await db
        .update(footerComponent)
        .set({
          data: { images, title },
          imageIds: imagesWithoutDuplicates,
        })
        .where(
          and(
            eq(footerComponent.id, id),
            eq(footerComponent.component, "PHOTO_GALLERY")
          )
        )
        .returning();
    } else {
      footerComp = await db
        .insert(footerComponent)
        .values({
          data: { images, title },
          component: "PHOTO_GALLERY",
          imageIds: imagesWithoutDuplicates,
        })
        .returning();
    }

    revalidatePath("/admin/footer");

    return { success: true };
  });
