"use server";

import { db } from "@/lib/db";
import { adminAction } from "@/lib/safe-action";
import { heroComponentSchema } from "@/validators/heroComponentSchema";
import { z } from "zod";

export const addHeroBoxComponent = adminAction(
  heroComponentSchema.and(z.object({ id: z.optional(z.string().nullable()) })),
  async (data) => {
    const { id, ...props } = data;

    await db.footerComponent.upsert({
      where: {
        id: id ?? undefined,
      },
      create: {
        component: "HERO_BOX",
        data: JSON.stringify(props),
        images: {
          connect: {
            id: props.image,
          },
        },
      },
      update: {
        data: JSON.stringify(props),
        images: {
          connect: {
            id: props.image,
          },
        },
      },
    });

    return {
      success: true,
    };
  }
);
