import { z } from "zod";
import { zfd } from "zod-form-data";
import { fileSchema } from "./fileSchema";

export const uploadImagesSchema = zfd.formData(z.record(fileSchema));
