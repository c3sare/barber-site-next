import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Editor, Frame } from "./editor-lib";
import { components } from "./components";
import { RenderPage } from "./RenderPage";

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

  return <RenderPage data={page.data} />;
}

export async function generateStaticParams() {
  const pages = await db.page.findMany({});

  return pages.map((page) => ({
    slug: page.slug,
  }));
}
