import db from "@/lib/drizzle";
import { notFound } from "next/navigation";
import { RenderPage } from "./RenderPage";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PageBuilderContent({ params }: Props) {
  const { slug } = await params;
  const page = await db.query.page.findFirst({
    where: (page, { eq }) => eq(page.slug, slug),
  });

  if (!page) return notFound();

  return <RenderPage data={page.data} />;
}

export async function generateStaticParams() {
  const pages = await db.query.page.findMany({ columns: { slug: true } });

  return pages.map((page) => ({
    slug: page.slug,
  }));
}
