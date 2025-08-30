import * as z from "zod/mini";
import { fileSchema } from "./fileSchema";

export const uploadImagesSchema = z.record(z.string(), fileSchema);
