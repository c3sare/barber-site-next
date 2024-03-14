"use server";

import { db } from "@/lib/db";
import { actionWithAuth } from "@/lib/safe-action";
import { uploadImagesSchema } from "@/validators/uploadImagesSchema";
import { FileType } from "@prisma/client";
import { put } from "@vercel/blob";
import imageSize from "buffer-image-size";
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
        const fileUpload = await put(file.name, file, {
          access: "public",
          addRandomSuffix: true,
        });

        const buffer = await Buffer.from(await file.arrayBuffer());

        const { width, height } = imageSize(buffer);

        const type = file.type.split("/")[0].toUpperCase() as FileType;

        const { base64: blurDataUrl } = await getPlaiceholder(buffer);

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
            url: fileUpload.url,
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
