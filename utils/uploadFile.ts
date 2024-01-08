import { put } from "@vercel/blob";
import { v4 as uuid } from "uuid";

export default async function uploadFile(blob: File) {
  const upload = await put(`${uuid()}${blob.name}`, blob, { access: "public" });

  return upload;
}
