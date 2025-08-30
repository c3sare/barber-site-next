"use server";

import { footerComponent } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { heroComponentSchema } from "@/validators/heroComponentSchema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as z from "zod/mini";

export const upsertHeroBoxComponent = adminAction
  .inputSchema(
    z.object({
      ...heroComponentSchema.shape,
      id: z.nullable(z.optional(z.number().check(z.nonnegative()))),
    })
  )
  .action(async ({ parsedInput: data }) => {
    const { id, ...props } = data;

    const checkImages = await db.query.file.findFirst({
      where: (file, { eq }) => eq(file.id, props.image),
    });

    if (!checkImages) throw new Error("Image don't exists");

    if (id) {
      await db
        .update(footerComponent)
        .set({ data: props, imageIds: [props.image] })
        .where(
          and(
            eq(footerComponent.id, id),
            eq(footerComponent.component, "HERO_BOX")
          )
        )
        .returning();
    } else {
      await db
        .insert(footerComponent)
        .values({ component: "HERO_BOX", data: props, imageIds: [props.image] })
        .returning();
    }

    revalidatePath("/admin/footer");

    return { success: true };
  });
