"use server";

import { db } from "@/lib/db";
import { adminAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
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

export const upsertLinkBoxComponent = adminAction(
  schema.and(z.object({ id: z.optional(z.string().nullable()) })),
  async (data) => {
    const { id, ...props } = data;

    await db.footerComponent.upsert({
      where: {
        id: id ?? "??????????????????????",
        component: "LINK_BOX",
      },
      create: {
        component: "LINK_BOX",
        data: props,
      },
      update: {
        data: props,
      },
    });

    revalidatePath("/admin/footer");

    return { success: true };
  }
);
