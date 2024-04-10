import { db } from "@/lib/db";
import lz from "lzutf8";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
const PageRender = dynamic(() => import("./page-render"), { ssr: false });

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

  return <PageRender content={content} />;
}

export async function generateStaticParams() {
  const pages = await db.page.findMany({});

  return pages.map((page) => ({
    slug: page.slug,
  }));
}
