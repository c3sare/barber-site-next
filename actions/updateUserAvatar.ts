"use server";

import { update } from "@/auth.config";
import { user } from "@/drizzle/schema";
import { upload as uploadCloudinary } from "@/lib/cloudinary";
import db from "@/lib/drizzle";
import { actionWithAuth } from "@/lib/safe-action";
import { bufferToBase64Url } from "@/utils/bufferToBase64Url";
import { avatarChangeSchema } from "@/validators/avatarChangeSchema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export const updateUserAvatar = actionWithAuth
  .schema(avatarChangeSchema)
  .action(async ({ parsedInput: { image }, ctx: session }) => {
    const parsedAvatar = image as File;

    const trimmedImage = await sharp(await parsedAvatar.arrayBuffer())
      .resize({
        width: 256,
        height: 256,
        fit: "cover",
        position: "center",
      })
      .flatten({ background: "#fff" })
      .toFormat("webp")
      .toBuffer();

    const base64 = bufferToBase64Url(trimmedImage);

    const upload = await uploadCloudinary(base64);

    const updateProfile = await db
      .update(user)
      .set({
        image: upload.secure_url,
      })
      .where(eq(user.id, session.user.id!));

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
  });
