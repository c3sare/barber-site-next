import { db } from "@/lib/db";

export const getFooterListComponents = async () => {
  const footer = await db.footerComponent.findMany({
    select: {
      id: true,
      component: true,
    },
  });

  return footer;
};
