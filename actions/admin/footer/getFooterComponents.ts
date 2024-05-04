import db from "@/lib/drizzle";
import { cache } from "react";

export const getFooterComponents = cache(async () => {
  const footerComponents = await db.query.footerComponent.findMany({
    with: {
      images: true,
    },
  });

  return footerComponents;
});
