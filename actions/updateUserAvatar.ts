"use server";

import { update } from "@/auth";
import { upload as uploadCloudinary } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { actionWithAuth } from "@/lib/safe-action";
import { bufferToBase64Url } from "@/utils/bufferToBase64Url";
import { avatarChangeSchema } from "@/validators/avatarChangeSchema";
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

    const base64 = bufferToBase64Url(trimmedImage);

    const upload = await uploadCloudinary(base64);

    const updateProfile = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: upload.secure_url,
      },
    });

    if (!updateProfile)
      throw new Error("There was a problem with update user!");

    await update({
      user: {
        image: upload.secure_url,
      },
    });

    revalidatePath("/user/settings", "layout");

    return {
      success: true,
    };
  }
);
