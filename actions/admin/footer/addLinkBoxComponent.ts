"use server";

import { db } from "@/lib/db";
import { adminAction } from "@/lib/safe-action";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  links: z.array(
    z.object({
      url: z.string(),
      name: z.string(),
    })
  ),
});

export const addLinkBoxComponent = adminAction(
  schema.and(z.object({ id: z.optional(z.string().nullable()) })),
  async (data) => {
    const { id, ...props } = data;

    const component = await db.footerComponent.upsert({
      where: {
        id: id ?? undefined,
      },
      create: {
        component: "LINK_BOX",
        data: JSON.stringify(props),
      },
      update: {
        data: JSON.stringify(props),
      },
    });

    return { success: true };
  }
);
