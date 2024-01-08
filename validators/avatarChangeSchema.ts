import { z } from "zod";

const MAX_FILE_SIZE = 500000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const avatarChangeSchema = z
  .any()
  .refine((files: FileList) => files?.length == 1, "Image is required.")
  .refine(
    (files: FileList) => files?.[0]?.size <= MAX_FILE_SIZE,
    `Max file size is ${Math.round(MAX_FILE_SIZE / 100000)}MB.`
  )
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    `${ACCEPTED_IMAGE_TYPES.map(
      (item) => "." + (item.split("/")?.[1] ?? "")
    ).join(", ")} files are accepted.`
  );
