import db from "@/lib/drizzle";

export const getPages = async () => {
  const pages = await db.query.page.findMany({
    columns: { id: true, name: true, slug: true },
  });

  return pages;
};
