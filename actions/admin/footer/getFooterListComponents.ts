import db from "@/lib/drizzle";

export const getFooterListComponents = async () => {
  const footer = await db.query.footerComponent.findMany({});

  return footer.map(({ id, component }) => ({ id, component }));
};
