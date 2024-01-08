"use server";

import { auth, update } from "@/auth";
import { db } from "@/lib/db";
import uploadFile from "@/utils/uploadFile";
import { revalidatePath } from "next/cache";

const updateAvatar = async (formData: FormData) => {
  try {
    const session = await auth();

    if (!session) throw new Error("No authorization");

    const image = formData.get("image") as File;

    if (!image) return null;

    const upload = await uploadFile(image);

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

    return revalidatePath("/", "layout");
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default updateAvatar;
