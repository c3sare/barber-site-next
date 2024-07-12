import lz from "lzutf8";
import db from "@/lib/drizzle";
import { notFound } from "next/navigation";
import Iframe from "./iframe";
import { SerializedNodes } from "@craftjs/core";

type Props = {
  params: {
    id: string;
  };
};

export default async function AdminEditorPreviewPage({
  params: { id },
}: Props) {
  const pageDb = await db.query.page.findFirst({
    where: (page, { eq }) => eq(page.id, parseInt(id)),
  });

  if (!pageDb) return notFound();

  const data = pageDb.data;

  const content: SerializedNodes | undefined =
    data === null
      ? undefined
      : JSON.parse(lz.decompress(lz.decodeBase64(data)));

  return (
    <Iframe className="flex-1 w-full h-full bg-background" data={content} />
  );
}
