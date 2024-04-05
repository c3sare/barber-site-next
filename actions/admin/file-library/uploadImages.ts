"use server";

import { upload } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { actionWithAuth } from "@/lib/safe-action";
import { bufferToBase64Url } from "@/utils/bufferToBase64Url";
import { uploadImagesSchema } from "@/validators/uploadImagesSchema";
import { FileType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getPlaiceholder } from "plaiceholder";

export const uploadImages = actionWithAuth(
  uploadImagesSchema,
  async (
    data,
    {
      session: {
        user: { id },
      },
    }
  ) => {
    const files = Object.keys(data).map((item) => data[item] as File);

    const items = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());

        const base64 = bufferToBase64Url(buffer);

        const fileUpload = await upload(base64);

        const {
          metadata: { width, height },
          base64: blurDataUrl,
        } = await getPlaiceholder(buffer);

        const type = file.type.split("/")[0].toUpperCase() as FileType;

        const data = await db.file.create({
          include: {
            author: {
              select: {
                name: true,
              },
            },
          },
          data: {
            id: fileUpload.public_id,
            name: file.name,
            type,
            width,
            height,
            blurDataUrl,
            url: fileUpload.secure_url,
            desc: "",
            author: {
              connect: {
                id,
              },
            },
          },
        });

        return data;
      })
    );

    revalidatePath("/admin/file-library");

    return items.map(({ author, url, ...file }) => ({
      ...file,
      author: author.name ?? "",
      preview: url,
    }));
  }
);
