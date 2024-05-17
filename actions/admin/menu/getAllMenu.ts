import db from "@/lib/drizzle";

export const getAllMenu = async () => {
  return await db.query.menu.findMany({});
};
