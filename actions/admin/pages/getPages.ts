import { file } from "@/drizzle/schema";
import db from "@/lib/drizzle";

export async function getPages() {
  const pages = await db.query.page.findMany({});

  const pagesWithImages = await Promise.all(
    pages.map(async (page) => {
      let images: (typeof file.$inferSelect)[] = [];

      if (page.imageIds.length)
        images = await db.query.file.findMany({
          where: (file, { inArray }) => inArray(file.id, page.imageIds),
        });

      return {
        ...page,
        images,
      };
    })
  );

  return pagesWithImages;
}
