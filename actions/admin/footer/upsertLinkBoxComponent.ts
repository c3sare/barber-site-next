"use server";

import { footerComponent } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { adminAction } from "@/lib/safe-action";
import { and, eq } from "drizzle-orm";
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

export const upsertLinkBoxComponent = adminAction
  .inputSchema(
    schema.and(
      z.object({ id: z.optional(z.number().nonnegative().nullable()) })
    )
  )
  .action(async ({ parsedInput: data }) => {
    const { id, ...props } = data;

    if (id) {
      await db
        .update(footerComponent)
        .set({
          data: props,
          imageIds: [],
        })
        .where(
          and(
            eq(footerComponent.id, id),
            eq(footerComponent.component, "LINK_BOX")
          )
        );
    } else
      await db.insert(footerComponent).values({
        component: "LINK_BOX",
        data: props,
        imageIds: [],
      });

    revalidatePath("/admin/footer");

    return { success: true };
  });
