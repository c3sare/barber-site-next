import db from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { menu as menuSchema } from "@/drizzle/schema";

export const getMenuItems = async (id: number) => {
  const menu = await db.query.menu.findFirst({
    where: eq(menuSchema.id, id),
    with: {
      items: {
        with: {
          page: true,
        },
        orderBy: (menuItem, { asc }) => [asc(menuItem.order)],
      },
    },
  });

  if (!menu) return [];

  return menu.items.map((item) => ({
    name: item.name,
    url: item.url ?? `/page/${item.page?.slug}`,
  }));
};
