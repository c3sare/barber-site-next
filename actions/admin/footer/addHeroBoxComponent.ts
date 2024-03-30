"use server";

import { db } from "@/lib/db";
import { adminAction } from "@/lib/safe-action";
import { heroComponentSchema } from "@/validators/heroComponentSchema";
import { z } from "zod";

export const addHeroBoxComponent = adminAction(
  heroComponentSchema.and(z.object({ id: z.optional(z.string().nullable()) })),
  async (data) => {
    const { id, ...props } = data;

    if (!id)
      await db.footerComponent.create({
        data: {
          component: "HERO_BOX",
          data: JSON.stringify(props),
          images: {
            connect: {
              id: props.image,
            },
          },
        },
      });
    else {
      await db.footerComponent.update({
        where: {
          id,
        },
        data: {
          data: JSON.stringify(props),
          images: {
            connect: {
              id: props.image,
            },
          },
        },
      });
    }

    return {
      success: true,
    };
  }
);
