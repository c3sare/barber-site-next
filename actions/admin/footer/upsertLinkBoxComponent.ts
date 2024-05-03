"use server";

import { footerComponent } from "@/drizzle/schema";
import db from "@/lib/drizzle";
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

    await db
      .insert(footerComponent)
      .values({
        component: "LINK_BOX",
        data: props,
      })
      .onConflictDoUpdate({
        target: footerComponent.id,
        set: {
          data: props,
        },
      });

    revalidatePath("/admin/footer");

    return { success: true };
  }
);
