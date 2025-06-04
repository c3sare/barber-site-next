"use server";

import { footerComponent } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { heroComponentSchema } from "@/validators/heroComponentSchema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const upsertHeroBoxComponent = adminAction
  .inputSchema(
    heroComponentSchema.and(
      z.object({ id: z.optional(z.number().nonnegative().nullable()) })
    )
  )
  .action(async ({ parsedInput: data }) => {
    const { id, ...props } = data;

    let footerComp: (typeof footerComponent.$inferSelect)[];

    const checkImages = await db.query.file.findFirst({
      where: (file, { eq }) => eq(file.id, props.image),
    });

    if (!checkImages) throw new Error("Image don't exists");

    if (id) {
      footerComp = await db
        .update(footerComponent)
        .set({
          data: props,
          imageIds: [props.image],
        })
        .where(
          and(
            eq(footerComponent.id, id),
            eq(footerComponent.component, "HERO_BOX")
          )
        )
        .returning();
    } else {
      footerComp = await db
        .insert(footerComponent)
        .values({
          component: "HERO_BOX",
          data: props,
          imageIds: [props.image],
        })
        .returning();
    }

    revalidatePath("/admin/footer");

    return {
      success: true,
    };
  });
