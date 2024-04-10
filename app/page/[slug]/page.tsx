import { db } from "@/lib/db";
import lz from "lzutf8";
import { notFound } from "next/navigation";
import { Editor, Frame } from "./editor-lib";
import { Button } from "@/app/editor/editor-components/button";
import { Container } from "@/app/editor/editor-components/container";
import { Root } from "@/app/editor/editor-components/root";
import { Text } from "@/app/editor/editor-components/text";
import { ThreeRowContainer } from "@/app/editor/editor-components/three-row-container";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PageBuilderContent({ params: { slug } }: Props) {
  const page = await db.page.findUnique({
    where: {
      slug,
    },
  });

  if (!page) return notFound();

  const content = lz.decompress(lz.decodeBase64(page.data));

  return (
    <Editor
      enabled={false}
      resolver={{ Button, Container, ThreeRowContainer, Root, Text }}
    >
      <Frame data={content} />
    </Editor>
  );
}

export async function generateStaticParams() {
  const pages = await db.page.findMany({});

  return pages.map((page) => ({
    slug: page.slug,
  }));
}
