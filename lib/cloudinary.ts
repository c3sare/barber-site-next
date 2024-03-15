import { v2 } from "cloudinary";

export default v2;

export const { upload, destroy } = v2.uploader;

export const { delete_resources } = v2.api;
