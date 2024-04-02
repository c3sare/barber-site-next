import { db } from "@/lib/db";
import { cache } from "react";

export const getFooterComponents = cache(async () => {
  const footerComponents = await db.footerComponent.findMany({
    include: {
      images: true,
    },
  });

  return footerComponents;
});
