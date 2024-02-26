import { z } from "zod";
import { zfd } from "zod-form-data";

const MAX_FILE_SIZE = 5000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const avatarChangeSchema = zfd.formData({
  image: z
    .any()
    .refine(
      (file: File) => file?.size <= MAX_FILE_SIZE,
      `Max file size is ${Math.round(MAX_FILE_SIZE / 1000000)}MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      `${ACCEPTED_IMAGE_TYPES.map(
        (item) => "." + (item.split("/")?.[1] ?? "")
      ).join(", ")} files are accepted.`
    ),
});
