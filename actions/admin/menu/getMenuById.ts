import db from "@/lib/drizzle";

export const getMenuById = async (id: number) => {
  const menu = await db.query.menu.findFirst({
    with: {
      items: {
        orderBy: (menuItem, { asc }) => [asc(menuItem.order)],
      },
    },
    where: (menuSchema, { eq }) => eq(menuSchema.id, id),
  });

  return menu;
};
