"use server";

import { user } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { actionWithAuth } from "@/lib/safe-action";
import { profileInformationsSchema } from "@/validators/profileInformationsSchema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateProfileInformation = actionWithAuth(
  profileInformationsSchema,
  async ({ email, name, phone }, { session }) => {
    const updatedUser = await db
      .update(user)
      .set({
        email,
        name,
        phone,
      })
      .where(eq(user.id, session.user.id!));

    if (!updatedUser)
      return {
        success: false,
      };

    revalidatePath("/user/settings", "page");

    return {
      success: true,
    };
  }
);
