"use server";

import { db } from "@/lib/db";
import { adminAction } from "@/lib/safe-action";
import { heroComponentSchema } from "@/validators/heroComponentSchema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const upsertHeroBoxComponent = adminAction(
  heroComponentSchema.and(z.object({ id: z.optional(z.string().nullable()) })),
  async (data) => {
    const { id, ...props } = data;

    await db.footerComponent.upsert({
      where: {
        id: id ?? "??????????????????????",
        component: "HERO_BOX",
      },
      create: {
        component: "HERO_BOX",
        data: props,
        images: {
          connect: {
            id: props.image,
          },
        },
      },
      update: {
        data: props,
        images: {
          connect: {
            id: props.image,
          },
        },
      },
    });

    revalidatePath("/admin/footer");

    return {
      success: true,
    };
  }
);
