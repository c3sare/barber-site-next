import { zfd } from "zod-form-data";
import { fileSchema } from "./fileSchema";

export const avatarChangeSchema = zfd.formData({
  image: fileSchema,
});
