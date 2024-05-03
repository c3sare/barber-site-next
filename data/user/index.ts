import db from "@/lib/drizzle";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    return user ?? null;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });

    return user ?? null;
  } catch {
    return null;
  }
};
