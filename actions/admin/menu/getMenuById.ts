import { menu as menuSchema } from "@/drizzle/schema";
import db from "@/lib/drizzle";

export const getMenuById = async (id: string) => {
  const menu = await db.query.menu.findFirst({
    with: {
      items: true,
    },
    where: (menuSchema, { eq }) => eq(menuSchema.id, id),
  });

  return menu;
};
