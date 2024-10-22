import lz from "lzutf8";
import db from "@/lib/drizzle";
import { notFound } from "next/navigation";
import Iframe from "./iframe";
import { SerializedNodes } from "@craftjs/core";
import { Content } from "./content";
import { ResizeBox } from "./resize-box";
import Fonts from "./fonts";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminEditorPreviewPage({ params }: Props) {
  const { id } = await params;
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
    <>
      <ResizeBox>
        <Iframe className="w-full bg-background">
          <Content data={content} />
        </Iframe>
      </ResizeBox>
      <Fonts data={content} />
    </>
  );
}
