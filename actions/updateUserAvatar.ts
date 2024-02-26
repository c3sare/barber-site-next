"use server";

import { update } from "@/auth";
import { db } from "@/lib/db";
import { actionWithAuth } from "@/lib/safe-action";
import { avatarChangeSchema } from "@/validators/avatarChangeSchema";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export const updateUserAvatar = actionWithAuth(
  avatarChangeSchema,
  async ({ image }, { session }) => {
    const parsedAvatar = image as File;

    const trimmedImage = await sharp(await parsedAvatar.arrayBuffer())
      .resize({
        width: 256,
        height: 256,
        fit: "cover",
        position: "center",
      })
      .toFormat("webp")
      .toBuffer();

    const upload = await put(`avatar.webp`, trimmedImage, {
      access: "public",
      addRandomSuffix: true,
    });

    const updateProfile = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: upload.url,
      },
    });

    if (!updateProfile)
      throw new Error("There was a problem with update user!");

    await update({
      user: {
        image: upload.url,
      },
    });

    revalidatePath("/user/settings", "layout");

    return {
      success: true,
    };
  }
);
