"use server";

import { auth, update } from "@/auth";
import { db } from "@/lib/db";
import { avatarChangeSchema } from "@/validators/avatarChangeSchema";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import sharp from "sharp";
import { v4 as uuid } from "uuid";

const updateAvatar = async (formData: FormData) => {
  try {
    const session = await auth();

    if (!session) throw new Error("No authorization");

    const image = formData.get("image") as File;

    if (!image) return null;

    const parsedAvatar = avatarChangeSchema.parse(image) as File;

    const trimmedImage = await sharp(await parsedAvatar.arrayBuffer())
      .resize({
        width: 256,
        height: 256,
        fit: "cover",
        position: "center",
      })
      .toFormat("webp")
      .toBuffer();

    const upload = await put(`${uuid()}.webp`, trimmedImage, {
      access: "public",
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

    return updateProfile;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default updateAvatar;
