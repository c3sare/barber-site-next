"use server";

import { file } from "@/drizzle/schema";
import { upload } from "@/lib/cloudinary";
import db from "@/lib/drizzle";
import { actionWithAuth } from "@/lib/safe-action";
import { bufferToBase64Url } from "@/utils/bufferToBase64Url";
import { uploadImagesSchema } from "@/validators/uploadImagesSchema";
import { fileType } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";
import { getPlaiceholder } from "plaiceholder";

type FileType = (typeof fileType.enumValues)[number];

export const uploadImages = actionWithAuth
  .inputSchema(uploadImagesSchema)
  .action(
    async ({
      parsedInput: data,
      ctx: {
        user: { id: userId },
      },
    }) => {
      const files = Object.keys(data).map(
        (item) => data[item] as unknown as File
      );

      const items = await Promise.all(
        files.map(async (fileToUpload) => {
          const buffer = Buffer.from(await fileToUpload.arrayBuffer());

          const base64 = bufferToBase64Url(buffer);

          const fileUpload = await upload(base64);

          const {
            metadata: { width, height },
            base64: blurDataUrl,
          } = await getPlaiceholder(buffer);

          const type = fileToUpload.type
            .split("/")[0]
            .toUpperCase() as FileType;

          const data = await db
            .insert(file)
            .values({
              id: fileUpload.public_id,
              name: fileToUpload.name,
              type,
              width,
              height,
              blurDataUrl,
              url: fileUpload.secure_url,
              desc: "",
              userId: userId!,
            })
            .returning();

          const uploadedFile = data[0]!;

          const author = await db.query.user.findFirst({
            where: (user, { eq }) => eq(user.id, userId!),
          });

          return { ...uploadedFile, author: { name: author?.name ?? "" } };
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
