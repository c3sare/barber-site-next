"use server";

import { db } from "@/lib/db";
import { adminAction } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createPage = adminAction(
  z.object({
    name: z.string(),
  }),
  async ({ name }) => {
    await db.page.create({
      data: {
        name,
        data: {},
      },
    });

    revalidatePath("/admin/pages");
    redirect("/admin/pages");
  }
);
