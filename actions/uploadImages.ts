"use server";

import { upload } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { actionWithAuth } from "@/lib/safe-action";
import { bufferToBase64Url } from "@/utils/bufferToBase64Url";
import { uploadImagesSchema } from "@/validators/uploadImagesSchema";
import { FileType } from "@prisma/client";
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

    const fileUploads = await Promise.all(
      files.map(async (file) => {
        const buffer = await Buffer.from(await file.arrayBuffer());

        const base64 = bufferToBase64Url(buffer);

        const fileUpload = await upload(base64);

        const {
          metadata: { width, height },
          base64: blurDataUrl,
        } = await getPlaiceholder(buffer);

        const type = file.type.split("/")[0].toUpperCase() as FileType;

        const {
          author,
          userId,
          blurDataUrl: _,
          ...fileDb
        } = await db.file.create({
          include: {
            author: {
              select: {
                name: true,
              },
            },
          },
          data: {
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

        return { ...fileDb, author: author.name };
      })
    );

    return true;
  }
);
