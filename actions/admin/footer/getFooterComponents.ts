import db from "@/lib/drizzle";
import { cache } from "react";

export const getFooterComponents = cache(async () => {
  const footerComponents = await db.query.footerComponent.findMany({
    with: {
      images: {
        with: {
          file: true,
        },
      },
    },
  });

  return footerComponents.map(({ images, ...item }) => ({
    ...item,
    images: images.map(({ file }) => file),
  }));
});
