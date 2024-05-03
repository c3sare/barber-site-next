import db from "@/lib/drizzle";

export async function getPages() {
  const pages = await db.query.page.findMany({});

  return pages;
}
