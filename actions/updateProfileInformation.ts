"use server";

import { db } from "@/lib/db";
import { actionWithAuth } from "@/lib/safe-action";
import { profileInformationsSchema } from "@/validators/profileInformationsSchema";
import { revalidatePath } from "next/cache";

export const updateProfileInformation = actionWithAuth(
  profileInformationsSchema,
  async ({ email, name, phone }, { session }) => {
    const user = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        email,
        name,
        phone,
      },
    });

    if (!user)
      return {
        success: false,
      };

    revalidatePath("/user/settings", "page");

    return {
      success: true,
    };
  }
);
