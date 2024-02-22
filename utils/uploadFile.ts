import { put } from "@vercel/blob";

export default async function uploadFile(blob: File) {
  const upload = await put(`${blob.name}`, blob, {
    access: "public",
    addRandomSuffix: true,
  });

  return upload;
}
