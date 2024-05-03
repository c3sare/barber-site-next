import { file } from "@/drizzle/schema";
import db from "@/lib/drizzle";
import { cache } from "react";

export const getFooterComponents = cache(async () => {
  const footerComponents = await db.query.footerComponent.findMany({});

  return await Promise.all(
    footerComponents.map(async (component) => {
      let images: (typeof file.$inferSelect)[] = [];

      if (component.imageIds && component.imageIds.length > 0)
        images = await db.query.file.findMany({
          where: (file, { inArray }) => inArray(file.id, component.imageIds),
        });

      return {
        ...component,
        images,
      };
    })
  );
});
