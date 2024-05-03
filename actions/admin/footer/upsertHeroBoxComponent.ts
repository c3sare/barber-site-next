"use server";

import { footerComponent, usedFooterImages } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { heroComponentSchema } from "@/validators/heroComponentSchema";
import { and, eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const upsertHeroBoxComponent = adminAction(
  heroComponentSchema.and(z.object({ id: z.optional(z.string().nullable()) })),
  async (data) => {
    const { id, ...props } = data;

    const footerComp = await db
      .insert(footerComponent)
      .values({
        component: "HERO_BOX",
        data: props,
      })
      .onConflictDoUpdate({
        target: footerComponent.id,
        set: {
          data: props,
        },
      })
      .returning();

    await db
      .insert(usedFooterImages)
      .values({ a: props.image, b: footerComp.at(0)!.id })
      .onConflictDoNothing();

    await db
      .delete(usedFooterImages)
      .where(
        and(
          not(eq(usedFooterImages.a, props.image)),
          eq(usedFooterImages.b, footerComp.at(0)!.id)
        )
      );

    revalidatePath("/admin/footer");

    return {
      success: true,
    };
  }
);
